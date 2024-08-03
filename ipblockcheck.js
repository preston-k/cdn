;(async () => {
            const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm')

            const supabaseUrl = 'https://ettzkxqykheylpckmsue.supabase.co'
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dHpreHF5a2hleWxwY2ttc3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMTcyMzQsImV4cCI6MjAzMzc5MzIzNH0.cXg_8de7LNzuESXvGdcSqPvBVIy7iVF3jCN0LLYpFPw'

            const supabase = createClient(supabaseUrl, supabaseKey)

            let blockstatus = localStorage.getItem('prestonkwei-ipblock')
            if (blockstatus == 'true') {
                document.querySelector('body').innerHTML = ''
                window.location.replace('https://prestonkwei.com/ipblock')
            } else {
                localStorage.setItem('prestonkwei-ipblock', 'false')
            }

            document.addEventListener('DOMContentLoaded', () => {
                async function getUserIp() {
                    try {
                        const response = await fetch('https://api.ipify.org?format=json')
                        const data = await response.json()
                        return data.ip
                    } catch (error) {
                        console.error('Error getting user IP:', error)
                        return null
                    }
                }

                async function isUserIpInDatabase(userIp) {
                    const { data, error } = await supabase
                        .from('IP-BLOCKS')
                        .select('ip')
                        .eq('ip', userIp)

                    if (error) {
                        console.error('Error checking user IP:', error.message)
                        return false
                    } else if (data.length > 0) {
                        console.log('In DB:', data)
                        return true
                    } else {
                        console.log('Not in DB')
                        return false
                    }
                }

                getUserIp().then(userIp => {
                    if (userIp) {
                        isUserIpInDatabase(userIp).then(found => {
                            if (found) {
                                document.querySelector('body').innerHTML = ''
                                localStorage.setItem('prestonkwei-ipblock', 'true')
                                window.location.replace('https://prestonkwei.com/ipblock')
                            } else {
                                console.log('Not in DB')
                                localStorage.setItem('prestonkwei-ipblock', 'false')
                            }
                        })
                    } else {
                        console.log('Could not retrieve user IP.')
                    }
                })
            })
        })()
console.log('IP Block Code Fully Loaded')
