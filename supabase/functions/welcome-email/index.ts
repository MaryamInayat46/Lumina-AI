import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    };

    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { email, location } = await req.json();

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email is required' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 1. Insert into waitlist
        const { error: insertError } = await supabase
            .from('waitlist')
            .insert([{ email, location }]);

        if (insertError) throw insertError;

        // 2. Trigger Welcome Email (Pseudo-code for Resend integration)
        // const res = await fetch('https://api.resend.com/emails', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        //   },
        //   body: JSON.stringify({
        //     from: 'Lumina AI <welcome@lumina-ai.com>',
        //     to: email,
        //     subject: 'Welcome to Lumina AI',
        //     html: '<strong>Thank you for joining the waitlist!</strong>',
        //   }),
        // });

        return new Response(JSON.stringify({ message: 'Success' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
