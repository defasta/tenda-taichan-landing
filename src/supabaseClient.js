import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rvsbllkkipjwomjtiwrl.supabase.co'
const supabaseKey = 'sb_publishable_ywfF7PRwsSKm0Cgg6jeVDw_qo5H5wlN'

export const supabase = createClient(supabaseUrl, supabaseKey)