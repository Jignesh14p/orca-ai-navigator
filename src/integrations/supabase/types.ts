export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      data_sources: {
        Row: {
          created_at: string
          detail: string
          error_message: string | null
          id: string
          last_synced_at: string | null
          meta: Json | null
          name: string
          source_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          detail?: string
          error_message?: string | null
          id?: string
          last_synced_at?: string | null
          meta?: Json | null
          name: string
          source_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          detail?: string
          error_message?: string | null
          id?: string
          last_synced_at?: string | null
          meta?: Json | null
          name?: string
          source_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      fishing_zones: {
        Row: {
          best_time: string
          created_at: string
          distance_km: number
          geometry: Json | null
          id: string
          lat: number
          likelihood: number
          lon: number
          name: string
          note: string | null
          status: string
          updated_at: string
          zone_id: string
        }
        Insert: {
          best_time?: string
          created_at?: string
          distance_km?: number
          geometry?: Json | null
          id?: string
          lat: number
          likelihood?: number
          lon: number
          name: string
          note?: string | null
          status?: string
          updated_at?: string
          zone_id: string
        }
        Update: {
          best_time?: string
          created_at?: string
          distance_km?: number
          geometry?: Json | null
          id?: string
          lat?: number
          likelihood?: number
          lon?: number
          name?: string
          note?: string | null
          status?: string
          updated_at?: string
          zone_id?: string
        }
        Relationships: []
      }
      forecasts: {
        Row: {
          created_at: string
          data: Json
          forecast_type: string
          id: string
          lat: number
          lon: number
          source_id: string
          updated_at: string
          valid_from: string
          valid_to: string
        }
        Insert: {
          created_at?: string
          data?: Json
          forecast_type: string
          id?: string
          lat: number
          lon: number
          source_id: string
          updated_at?: string
          valid_from: string
          valid_to: string
        }
        Update: {
          created_at?: string
          data?: Json
          forecast_type?: string
          id?: string
          lat?: number
          lon?: number
          source_id?: string
          updated_at?: string
          valid_from?: string
          valid_to?: string
        }
        Relationships: [
          {
            foreignKeyName: "forecasts_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["source_id"]
          },
        ]
      }
      hazard_zones: {
        Row: {
          active: boolean
          alternative: string | null
          created_at: string
          geometry: Json
          hazard_type: string
          id: string
          name: string
          reason: string | null
          severity: string
          updated_at: string
          valid_from: string | null
          valid_to: string | null
          zone_id: string
        }
        Insert: {
          active?: boolean
          alternative?: string | null
          created_at?: string
          geometry?: Json
          hazard_type: string
          id?: string
          name: string
          reason?: string | null
          severity?: string
          updated_at?: string
          valid_from?: string | null
          valid_to?: string | null
          zone_id: string
        }
        Update: {
          active?: boolean
          alternative?: string | null
          created_at?: string
          geometry?: Json
          hazard_type?: string
          id?: string
          name?: string
          reason?: string | null
          severity?: string
          updated_at?: string
          valid_from?: string | null
          valid_to?: string | null
          zone_id?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          bearing: string
          created_at: string
          destination: string
          distance_km: number
          eta_min: number
          geometry: Json | null
          harbour: string
          id: string
          route_id: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          bearing?: string
          created_at?: string
          destination: string
          distance_km?: number
          eta_min?: number
          geometry?: Json | null
          harbour?: string
          id?: string
          route_id: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          bearing?: string
          created_at?: string
          destination?: string
          distance_km?: number
          eta_min?: number
          geometry?: Json | null
          harbour?: string
          id?: string
          route_id?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      sync_state: {
        Row: {
          created_at: string
          device_id: string | null
          id: string
          items: Json
          last_synced_at: string
          online: boolean
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          device_id?: string | null
          id?: string
          items?: Json
          last_synced_at?: string
          online?: boolean
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          device_id?: string | null
          id?: string
          items?: Json
          last_synced_at?: string
          online?: boolean
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
