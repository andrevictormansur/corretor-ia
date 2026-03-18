import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://xeofeakxcunktilarfsr.supabase.co'
const SUPABASE_KEY = 'sb_publishable_JNyRBPuMIg7UVHgL7dRuvQ_ykZXZr12'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
