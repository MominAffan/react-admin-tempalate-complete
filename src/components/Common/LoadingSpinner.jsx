import { Box, CircularProgress } from "@mui/material"

const LoadingSpinner = () => {
  return (
    <Box className="loading-spinner">
      <CircularProgress size={40} />
    </Box>
  )
}

export default LoadingSpinner
