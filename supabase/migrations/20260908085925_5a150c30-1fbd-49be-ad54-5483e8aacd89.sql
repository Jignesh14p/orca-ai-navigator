create table public.data_sources (
    id uuid primary key default gen_random_uuid(),
    source_id text not null unique,
    name text not null,
    detail text not null default '',
    status text not null default 'Unknown',
    last_synced_at timestamptz,
    error_message text,
    meta jsonb default '{}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

grant select on public.data_sources to anon;
grant select on public.data_sources to authenticated;
grant all on public.data_sources to service_role;

alter table public.data_sources enable row level security;

create policy "Public can read data sources"
    on public.data_sources
    for select
    to anon
    using (true);

create policy "Authenticated can read data sources"
    on public.data_sources
    for select
    to authenticated
    using (true);

create table public.forecasts (
    id uuid primary key default gen_random_uuid(),
    source_id text not null references public.data_sources(source_id),
    forecast_type text not null,
    lat numeric not null,
    lon numeric not null,
    valid_from timestamptz not null,
    valid_to timestamptz not null,
    data jsonb not null default '{}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

grant select on public.forecasts to anon;
grant select on public.forecasts to authenticated;
grant all on public.forecasts to service_role;

alter table public.forecasts enable row level security;

create policy "Public can read forecasts"
    on public.forecasts
    for select
    to anon
    using (true);

create policy "Authenticated can read forecasts"
    on public.forecasts
    for select
    to authenticated
    using (true);

create table public.fishing_zones (
    id uuid primary key default gen_random_uuid(),
    zone_id text not null unique,
    name text not null,
    likelihood integer not null default 0,
    distance_km numeric not null default 0,
    best_time text not null default '',
    status text not null default 'safe',
    note text,
    lat numeric not null,
    lon numeric not null,
    geometry jsonb default '{}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

grant select on public.fishing_zones to anon;
grant select on public.fishing_zones to authenticated;
grant all on public.fishing_zones to service_role;

alter table public.fishing_zones enable row level security;

create policy "Public can read fishing zones"
    on public.fishing_zones
    for select
    to anon
    using (true);

create policy "Authenticated can read fishing zones"
    on public.fishing_zones
    for select
    to authenticated
    using (true);

create table public.hazard_zones (
    id uuid primary key default gen_random_uuid(),
    zone_id text not null,
    name text not null,
    hazard_type text not null,
    severity text not null default 'info',
    active boolean not null default true,
    valid_from timestamptz,
    valid_to timestamptz,
    reason text,
    alternative text,
    geometry jsonb not null default '{}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

grant select on public.hazard_zones to anon;
grant select on public.hazard_zones to authenticated;
grant all on public.hazard_zones to service_role;

alter table public.hazard_zones enable row level security;

create policy "Public can read hazard zones"
    on public.hazard_zones
    for select
    to anon
    using (true);

create policy "Authenticated can read hazard zones"
    on public.hazard_zones
    for select
    to authenticated
    using (true);

create table public.routes (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    route_id text not null,
    destination text not null,
    harbour text not null default '',
    distance_km numeric not null default 0,
    eta_min integer not null default 0,
    bearing text not null default '',
    status text not null default 'SAFE',
    geometry jsonb default '{}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (user_id, route_id)
);

grant all on public.routes to service_role;
grant select, insert, update, delete on public.routes to authenticated;

alter table public.routes enable row level security;

create policy "Users can manage own routes"
    on public.routes
    for all
    to authenticated
    using (user_id = auth.uid())
    with check (user_id = auth.uid());

create table public.sync_state (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade unique,
    device_id text,
    online boolean not null default true,
    last_synced_at timestamptz not null default now(),
    items jsonb not null default '{}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

grant all on public.sync_state to service_role;
grant select, insert, update, delete on public.sync_state to authenticated;

alter table public.sync_state enable row level security;

create policy "Users can manage own sync state"
    on public.sync_state
    for all
    to authenticated
    using (user_id = auth.uid())
    with check (user_id = auth.uid());

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger update_data_sources_updated_at before update on public.data_sources
    for each row execute function public.update_updated_at_column();
create trigger update_forecasts_updated_at before update on public.forecasts
    for each row execute function public.update_updated_at_column();
create trigger update_fishing_zones_updated_at before update on public.fishing_zones
    for each row execute function public.update_updated_at_column();
create trigger update_hazard_zones_updated_at before update on public.hazard_zones
    for each row execute function public.update_updated_at_column();
create trigger update_routes_updated_at before update on public.routes
    for each row execute function public.update_updated_at_column();
create trigger update_sync_state_updated_at before update on public.sync_state
    for each row execute function public.update_updated_at_column();

insert into public.data_sources (source_id, name, detail, status, last_synced_at)
values
    ('incois', 'INCOIS', 'Fishing zones · Ocean forecast', 'Connected', now()),
    ('imd', 'IMD', 'Marine weather · Cyclone alerts', 'Connected', now()),
    ('mosdac', 'ISRO / MOSDAC', 'Satellite ocean observation', 'Connected', now()),
    ('navic', 'NavIC GPS', 'Positioning · Navigation', 'Active', now())
on conflict (source_id) do update set
    status = excluded.status,
    last_synced_at = excluded.last_synced_at,
    updated_at = now();

insert into public.fishing_zones (zone_id, name, likelihood, distance_km, best_time, status, note, lat, lon, geometry)
values
    ('alpha', 'Zone Alpha', 87, 8.2, '6:30 AM – 10:00 AM', 'sustainable', null, 13.245, 80.315, '{"x":62,"y":38}'::jsonb),
    ('beta', 'Zone Beta', 68, 12.0, '5:00 AM – 9:00 AM', 'safe', null, 12.981, 80.402, '{"x":74,"y":62}'::jsonb),
    ('gamma', 'Zone Gamma', 91, 15.6, '6:00 AM – 11:00 AM', 'restricted', 'Conservation restriction detected — coral and turtle nesting sector.', 13.402, 80.468, '{"x":79,"y":22}'::jsonb)
on conflict (zone_id) do update set
    likelihood = excluded.likelihood,
    distance_km = excluded.distance_km,
    best_time = excluded.best_time,
    status = excluded.status,
    note = excluded.note,
    lat = excluded.lat,
    lon = excluded.lon,
    geometry = excluded.geometry,
    updated_at = now();

insert into public.hazard_zones (zone_id, name, hazard_type, severity, active, valid_from, valid_to, reason, alternative, geometry)
values
    ('cyclone-se', 'South-east cyclonic system', 'cyclone', 'critical', true, now(), now() + interval '3 days', 'A cyclonic system is forming in the south-east sector.', 'Stay within 5 km of the coast today.', '{"type":"polygon","points":[[80.3,12.8],[80.6,12.8],[80.6,13.1],[80.3,13.1]]}'::jsonb),
    ('wind-afternoon', 'Chennai Coast wind rise', 'wind', 'warning', true, now(), now() + interval '1 day', 'Winds will rise to 34 km/h after 2 PM.', 'Return to harbour before 1:30 PM.', '{"type":"circle","center":[80.2707,13.0827],"radiusKm":15}'::jsonb)
on conflict do nothing;