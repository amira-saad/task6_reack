import { useState } from 'react'
import { Box, Stack, Divider, Typography, TextField, MenuItem, Button } from '@mui/material'
import { FormControl, FormLabel, FormControlLabel, Checkbox, RadioGroup, Radio } from '@mui/material'
import { useSelector } from 'react-redux'

// ── fake "logged in user" data — in a real app this comes from auth/Redux
// For now we read from localStorage (saved during Register)
const loadUser = () => {
    try {
        const saved = localStorage.getItem('user')
        return saved ? JSON.parse(saved) : {
            firstName: 'Ahmed',
            lastName: 'Hassan',
            email: 'ahmed@example.com',
            country: 'Egypt',
            plan: 'free',
            genres: ['action', 'scifi'],
        }
    } catch {
        return {}
    }
}

const Profile = () => {
    const favorites = useSelector(state => state.favorites.favorites)

    // load saved user info
    const savedUser = loadUser()

    const [firstName, setFirstName] = useState(savedUser.firstName || '')
    const [lastName,  setLastName]  = useState(savedUser.lastName  || '')
    const [email,     setEmail]     = useState(savedUser.email     || '')
    const [country,   setCountry]   = useState(savedUser.country   || '')
    const [plan,      setPlan]      = useState(savedUser.plan      || 'free')
    const [genres,    setGenres]    = useState(savedUser.genres    || [])
    const [saved,     setSaved]     = useState(false)

    // same checkbox logic from MuiCheckbox
    const handleGenreChange = (event) => {
        const idx = genres.indexOf(event.target.value)
        if (idx === -1) setGenres([...genres, event.target.value])
        else setGenres(genres.filter(g => g !== event.target.value))
    }

    const handleSave = () => {
        const updated = { firstName, lastName, email, country, plan, genres }
        localStorage.setItem('user', JSON.stringify(updated))
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    // avatar initials
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U'

    return (
        <Box sx={{ background: '#f5f5f5', minHeight: '100vh', py: 5, px: 2 }}>
            <Box sx={{ maxWidth: 600, margin: '0 auto' }}>

                {/* ── Header Card ── */}
                <Box sx={{
                    background: 'linear-gradient(135deg, #e24b4a, #c62a47)',
                    borderRadius: 3,
                    p: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    mb: 3,
                    boxShadow: '0 8px 24px rgba(226,75,74,0.3)',
                }}>
                    {/* Avatar circle with initials */}
                    <Box sx={{
                        width: 72, height: 72, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        border: '3px solid rgba(255,255,255,0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.8rem', fontWeight: 'bold', color: 'white',
                        flexShrink: 0,
                    }}>
                        {initials}
                    </Box>

                    <Box>
                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {firstName} {lastName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            {email}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            {/* Plan badge */}
                            <Box sx={{
                                background: 'rgba(255,255,255,0.2)', borderRadius: 20,
                                px: 1.5, py: 0.3,
                            }}>
                                <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>
                                    {plan} plan
                                </Typography>
                            </Box>
                            {/* Favorites count badge */}
                            <Box sx={{
                                background: 'rgba(255,255,255,0.2)', borderRadius: 20,
                                px: 1.5, py: 0.3,
                            }}>
                                <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                                    ❤️ {favorites.length} Favorites
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* ── Edit Form Card ── */}
                <Box sx={{ background: 'white', borderRadius: 3, p: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                    <Stack spacing={3}>

                        {/* success message */}
                        {saved && (
                            <Box sx={{ background: '#f0fff4', border: '1px solid #68d391', borderRadius: 2, p: 1.5 }}>
                                <Typography variant="body2" sx={{ color: '#276749', fontWeight: 'bold', textAlign: 'center' }}>
                                    ✅ Profile saved successfully!
                                </Typography>
                            </Box>
                        )}

                        {/* ── Personal Info ── */}
                        <Typography variant="overline" sx={{ color: 'gray', fontWeight: 'bold' }}>
                            Personal Info
                        </Typography>

                        {/* Stack row — same as Register */}
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                fullWidth
                            />
                        </Stack>

                        <TextField
                            label="Email Address"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                        />

                        <Divider />

                        {/* ── Country Select — same as Register ── */}
                        <Typography variant="overline" sx={{ color: 'gray', fontWeight: 'bold' }}>
                            Location
                        </Typography>

                        <TextField
                            select
                            label="Country"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            fullWidth
                            variant="outlined"
                        >
                            <MenuItem value="Egypt">Egypt</MenuItem>
                            <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                            <MenuItem value="UAE">UAE</MenuItem>
                            <MenuItem value="USA">USA</MenuItem>
                            <MenuItem value="UK">UK</MenuItem>
                        </TextField>

                        <Divider />

                        {/* ── Subscription Plan — RadioGroup same as Register ── */}
                        <FormControl>
                            <FormLabel sx={{ fontWeight: 'bold', color: 'black' }}>
                                Subscription Plan
                            </FormLabel>
                            <RadioGroup value={plan} onChange={(e, val) => setPlan(val)}>
                                <FormControlLabel value="free"     control={<Radio color="error" />} label="Free" />
                                <FormControlLabel value="standard" control={<Radio color="error" />} label="Standard" />
                                <FormControlLabel value="premium"  control={<Radio color="error" />} label="Premium" />
                            </RadioGroup>
                        </FormControl>

                        <Divider />

                        {/* ── Favorite Genres — Checkboxes same as Register ── */}
                        <FormControl>
                            <FormLabel sx={{ fontWeight: 'bold', color: 'black' }}>
                                Favorite Genres
                            </FormLabel>
                            <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                                <FormControlLabel onChange={handleGenreChange} value="action" control={<Checkbox color="error" checked={genres.includes('action')} />} label="Action" />
                                <FormControlLabel onChange={handleGenreChange} value="drama"  control={<Checkbox color="error" checked={genres.includes('drama')}  />} label="Drama"  />
                                <FormControlLabel onChange={handleGenreChange} value="scifi"  control={<Checkbox color="error" checked={genres.includes('scifi')}  />} label="Sci-Fi" />
                                <FormControlLabel onChange={handleGenreChange} value="comedy" control={<Checkbox color="error" checked={genres.includes('comedy')} />} label="Comedy" />
                            </Stack>
                            <Typography variant="body2" sx={{ color: 'gray', mt: 0.5 }}>
                                Selected: {genres.length > 0 ? genres.join(', ') : 'none'}
                            </Typography>
                        </FormControl>

                        <Divider />

                        {/* ── Favorites Summary ── */}
                        <Typography variant="overline" sx={{ color: 'gray', fontWeight: 'bold' }}>
                            My Favorites
                        </Typography>

                        {favorites.length === 0 ? (
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                No favorites yet. Go add some! ❤️
                            </Typography>
                        ) : (
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                {favorites.map(movie => (
                                    <Box key={movie.id} sx={{
                                        border: '1px solid #eee', borderRadius: 2,
                                        px: 1.5, py: 0.5, display: 'flex',
                                        alignItems: 'center', gap: 1, background: '#fff5f5',
                                    }}>
                                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#c62a47' }}>
                                            ❤️ {movie.Title}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        )}

                        <Divider />

                        {/* ── Save Button ── */}
                        <Button
                            variant="contained"
                            color="error"
                            size="large"
                            fullWidth
                            onClick={handleSave}
                        >
                            Save Changes
                        </Button>

                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default Profile