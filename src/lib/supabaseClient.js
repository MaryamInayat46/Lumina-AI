import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isMock = !supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url';

// --- MOCK CLIENT IMPLEMENTATION ---
const mockClient = {
    from: (table) => {
        return {
            select: (columns, options = {}) => {
                return {
                    order: (column, { ascending = true } = {}) => ({
                        data: JSON.parse(localStorage.getItem(`mock_${table}`) || '[]'),
                        error: null
                    }),
                    count: options.count === 'exact' ? {
                        data: null,
                        count: JSON.parse(localStorage.getItem(`mock_${table}`) || '[]').length,
                        error: null
                    } : null,
                    data: JSON.parse(localStorage.getItem(`mock_${table}`) || '[]'),
                    error: null
                };
            },
            insert: async (records) => {
                // Simulate Latency
                await new Promise(resolve => setTimeout(resolve, 800));

                const existingData = JSON.parse(localStorage.getItem(`mock_${table}`) || '[]');
                const newRecords = records.map(r => ({
                    id: crypto.randomUUID(),
                    created_at: new Date().toISOString(),
                    ...r
                }));

                // Check for unique email (simple mock check)
                if (table === 'waitlist') {
                    const emails = existingData.map(d => d.email);
                    if (newRecords.some(r => emails.includes(r.email))) {
                        return { data: null, error: { code: '23505', message: 'Duplicate email' } };
                    }
                }

                const updatedData = [...existingData, ...newRecords];
                localStorage.setItem(`mock_${table}`, JSON.stringify(updatedData));

                // Trigger local "real-time" update
                window.dispatchEvent(new CustomEvent('mock_db_change', { detail: { table, record: newRecords[0] } }));

                return { data: newRecords, error: null };
            }
        };
    },
    channel: () => ({
        on: (event, filter, callback) => {
            const handler = (e) => {
                if (e.detail.table === filter.table) {
                    callback({ new: e.detail.record });
                }
            };
            window.addEventListener('mock_db_change', handler);
            return {
                subscribe: () => ({ unsubscribe: () => window.removeEventListener('mock_db_change', handler) })
            };
        }
    }),
    removeChannel: () => { },
    functions: {
        invoke: async (name, { body }) => {
            await new Promise(resolve => setTimeout(resolve, 800));
            console.log(`%c LUMINA: Executing Mock Edge Function [${name}]`, 'color: #00f2ff; font-weight: bold;', body);

            // If it's the welcome email, we simulate an insert for the waitlist if body contains email
            if (name === 'welcome-email' && body.email) {
                const res = await mockClient.from('waitlist').insert([{ email: body.email, location: body.location }]);
                if (res.error) return { data: null, error: res.error };
            }

            return { data: { message: 'Mock Success' }, error: null };
        }
    }
};

// --- CLIENT EXPORT ---
if (isMock) {
    console.log(
        '%c LUMINA: Running in Mock Mode (No Supabase Credentials Found) ',
        'background: #0f172a; color: #00f2ff; border: 1px solid #00f2ff; padding: 4px; border-radius: 4px; font-weight: bold;'
    );
}

export const supabase = isMock ? mockClient : createClient(supabaseUrl, supabaseAnonKey);
export { isMock };
