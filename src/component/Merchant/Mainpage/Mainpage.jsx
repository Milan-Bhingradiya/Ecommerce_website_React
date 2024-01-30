import { Box, CssBaseline } from "@mui/material"
import Navbar from "../global/Navbar"
import Sidebar from "../global/Sidebar"
import { grey } from "@mui/material/colors"
import { useTheme } from "@emotion/react"
import AddproductPage from "../AddproductPage/AddproductPage"
import { useContext } from "react"
import Merchantcontext from "../context/Merchantcontext"
import GetallproductPage from "../GetallproductPage/GetallproductPage"

function Mainpage() {
  const theme = useTheme();
  const { selectedSideBarItem, setselectedSideBarItem } = useContext(Merchantcontext)

  const { opensidebar, setopensidebar } = useContext(Merchantcontext);
  console.log(theme);
  return (<>

    <Box  sx={opensidebar ? { bgcolor: theme.palette.background.default, height: '100vh', marginLeft: '210px', width: 'calc(100% - 210px)', transition: 'width 0.3s ease, margin 0.3s ease' } : { bgcolor: theme.palette.background.default, height: '100vh', width: '100%', transition: 'width 0.3s ease, margin 0.3s ease' }}>
      <CssBaseline />

      <Navbar />
      { 
        (selectedSideBarItem === "addproduct") ?
          <AddproductPage /> : ""
      }
      { 
        (selectedSideBarItem === "allproduct") ?
          <GetallproductPage /> : ""
      }

    </Box>
    <Sidebar />
  </>
  )
}

export default Mainpage