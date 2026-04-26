import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Grid,
  Stack,
  Divider,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [plan, setPlan] = useState("free");
  const [types, setTypes] = useState([]);
  const [terms, setTerms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTypeChange = (event) => {
    const value = event.target.value;

    if (types.includes(value)) {
      setTypes(types.filter((item) => item !== value));
    } else {
      setTypes([...types, value]);
    }
  };

  const handleTerms = (event) => {
    const value = event.target.value;

    if (terms.includes(value)) {
      setTerms(terms.filter((item) => item !== value));
    } else {
      setTerms([...terms, value]);
    }
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill all required fields");
      return;
    }

    if (!terms.includes("agree")) {
      setError("Please accept Terms & Conditions");
      return;
    }

    setError(null);
    setLoading(true);

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      country,
      plan,
      types,
    };

    try {
      const res = await fetch("http://localhost:3000/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Registration failed");

      const data = await res.json();

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/Login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 550,
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          p: isMobile ? 2 : 4,
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            color="error"
            textAlign="center"
            fontWeight="bold"
          >
            MOVIES
          </Typography>

          <Typography
            variant="subtitle1"
            textAlign="center"
            color="gray"
          >
            Create your account
          </Typography>

          {error && (
            <Box
              sx={{
                backgroundColor: "#fff5f5",
                border: "1px solid red",
                borderRadius: 2,
                p: 1.5,
              }}
            >
              <Typography color="error" textAlign="center">
                {error}
              </Typography>
            </Box>
          )}

          <Divider />

          <Typography variant="overline">Personal Info</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>

          <TextField
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Divider />

          <Typography variant="overline">Location</Typography>

          <TextField
            select
            label="Select Country"
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <MenuItem value="Egypt">Egypt</MenuItem>
            <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
          </TextField>

          <Divider />

          <FormControl>
            <FormLabel>Subscription Plan</FormLabel>

            <RadioGroup
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <FormControlLabel
                value="free"
                control={<Radio color="error" />}
                label="Free"
              />

              <FormControlLabel
                value="standard"
                control={<Radio color="error" />}
                label="Standard"
              />

              <FormControlLabel
                value="premium"
                control={<Radio color="error" />}
                label="Premium"
              />
            </RadioGroup>
          </FormControl>

          <Divider />

          <FormControl fullWidth>
            <FormLabel>Favorite Types</FormLabel>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  value="action"
                  control={<Checkbox color="error" />}
                  label="Action"
                  onChange={handleTypeChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  value="drama"
                  control={<Checkbox color="error" />}
                  label="Drama"
                  onChange={handleTypeChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  value="scifi"
                  control={<Checkbox color="error" />}
                  label="Sci-Fi"
                  onChange={handleTypeChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  value="comedy"
                  control={<Checkbox color="error" />}
                  label="Comedy"
                  onChange={handleTypeChange}
                />
              </Grid>
            </Grid>

            <Typography variant="body2" color="gray" sx={{ mt: 1 }}>
              Selected: {types.length ? types.join(", ") : "none"}
            </Typography>
          </FormControl>

          <Divider />

          <FormControlLabel
            value="agree"
            control={<Checkbox color="error" />}
            label="I agree to Terms & Conditions"
            onChange={handleTerms}
          />

          <Button
            variant="contained"
            color="error"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ py: 1.3 }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <Button
            variant="text"
            color="error"
            fullWidth
            onClick={() => navigate("/login")}
          >
            Already have an account? Sign In
          </Button>

          <Typography
            variant="caption"
            textAlign="center"
            color="gray"
          >
            © 2025 Movies. All rights reserved.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;