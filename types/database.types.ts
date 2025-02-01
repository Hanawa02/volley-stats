export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      actions: {
        Row: {
          action_category: Database["public"]["Enums"]["Action Categories"]
          action_result: Database["public"]["Enums"]["Action Results"]
          created_at: string
          id: string
          opposite_team_action: boolean
          player_id: string | null
          set_id: string
        }
        Insert: {
          action_category: Database["public"]["Enums"]["Action Categories"]
          action_result: Database["public"]["Enums"]["Action Results"]
          created_at?: string
          id?: string
          opposite_team_action?: boolean
          player_id?: string | null
          set_id: string
        }
        Update: {
          action_category?: Database["public"]["Enums"]["Action Categories"]
          action_result?: Database["public"]["Enums"]["Action Results"]
          created_at?: string
          id?: string
          opposite_team_action?: boolean
          player_id?: string | null
          set_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "actions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "actions_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "sets"
            referencedColumns: ["id"]
          },
        ]
      }
      game_participating_players: {
        Row: {
          created_at: string
          game_id: string
          id: number
          player_id: string
          uniform_number: number
        }
        Insert: {
          created_at?: string
          game_id: string
          id?: number
          player_id: string
          uniform_number: number
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: number
          player_id?: string
          uniform_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "game_participating_players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_participating_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string
          date: string
          id: string
          is_home_game: boolean
          opponent_team_name: string
          team_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          is_home_game: boolean
          opponent_team_name: string
          team_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          is_home_game?: boolean
          opponent_team_name?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "games_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      sets: {
        Row: {
          created_at: string
          game_id: string
          id: string
          starting_libero_1: string | null
          starting_libero_2: string | null
          starting_player_1: string
          starting_player_2: string
          starting_player_3: string
          starting_player_4: string
          starting_player_5: string
          starting_player_6: string
          team_starts_serving: boolean
        }
        Insert: {
          created_at?: string
          game_id: string
          id?: string
          starting_libero_1?: string | null
          starting_libero_2?: string | null
          starting_player_1: string
          starting_player_2: string
          starting_player_3: string
          starting_player_4: string
          starting_player_5: string
          starting_player_6: string
          team_starts_serving: boolean
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          starting_libero_1?: string | null
          starting_libero_2?: string | null
          starting_player_1?: string
          starting_player_2?: string
          starting_player_3?: string
          starting_player_4?: string
          starting_player_5?: string
          starting_player_6?: string
          team_starts_serving?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "sets_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sets_starting_libero_1_fkey"
            columns: ["starting_libero_1"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sets_starting_libero_2_fkey"
            columns: ["starting_libero_2"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sets_starting_player_1_fkey"
            columns: ["starting_player_1"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sets_starting_player_2_fkey"
            columns: ["starting_player_2"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sets_starting_player_3_fkey"
            columns: ["starting_player_3"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sets_starting_player_4_fkey"
            columns: ["starting_player_4"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sets_starting_player_5_fkey"
            columns: ["starting_player_5"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sets_starting_player_6_fkey"
            columns: ["starting_player_6"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          access: Database["public"]["Enums"]["Access Type"]
          created_at: string
          id: string
          name: string
          positions: Database["public"]["Enums"]["Player Positions"][]
          team_id: string
          uniform_number: number | null
          user_id: string | null
        }
        Insert: {
          access?: Database["public"]["Enums"]["Access Type"]
          created_at?: string
          id?: string
          name: string
          positions: Database["public"]["Enums"]["Player Positions"][]
          team_id: string
          uniform_number?: number | null
          user_id?: string | null
        }
        Update: {
          access?: Database["public"]["Enums"]["Access Type"]
          created_at?: string
          id?: string
          name?: string
          positions?: Database["public"]["Enums"]["Player Positions"][]
          team_id?: string
          uniform_number?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_ids_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
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
      "Access Type": "admin" | "statistics" | "read_only"
      "Action Attack Results":
        | "direct_point"
        | "touch_point"
        | "out"
        | "in_game"
        | "into_the_net"
        | "blocked"
      "Action Block Results": "direct_point" | "touch_point" | "in_game" | "out"
      "Action Categories": "serve" | "pass" | "set" | "attack" | "block" | "dig"
      "Action Dig Results": "good" | "bad" | "miss"
      "Action Pass Results": "good" | "bad" | "miss"
      "Action Results":
        | "direct_point"
        | "touch_point"
        | "in_game"
        | "out"
        | "into_the_net"
        | "blocked"
        | "good"
        | "bad"
        | "miss"
      "Action Serve Results":
        | "direct_point"
        | "touch_point"
        | "out"
        | "into_the_net"
        | "in_game"
      "Action Set Results": "good" | "bad" | "miss"
      "Player Positions":
        | "coach"
        | "libero"
        | "setter"
        | "middle_blocker"
        | "opposite_hitter"
        | "outside_hitter"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
