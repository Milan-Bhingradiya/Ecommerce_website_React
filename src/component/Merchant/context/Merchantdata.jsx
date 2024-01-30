import { useMemo, useState } from 'react';
import Merchantcontext from './Merchantcontext'
import { ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from '../global/Theme';
import axios from '../axios';

function Merchantdata(props) {


    const [mode, setmode] = useState("light");
    const [opensidebar, setopensidebar] = useState(false);
    
    const [categories, setcategories] = useState({});
    const [selectedSideBarItem, setselectedSideBarItem] = useState("addproduct");





    const [oneProductDetaill_Edit, setoneProductDetaill_Edit] = useState(null);


    const [isEditMode, setisEditMode] = useState(false);


    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    const getcategories = async () => {
        console.log("getcategory called")
        var res = await axios.get('/get/categories');
        console.log(res.data);
        setcategories( res.data.categories)
    }



    return (
        <Merchantcontext.Provider value={{ mode, setmode ,opensidebar,setopensidebar ,categories,getcategories,selectedSideBarItem,setselectedSideBarItem,oneProductDetaill_Edit,setoneProductDetaill_Edit,isEditMode, setisEditMode,
        
        
        }}>
            <ThemeProvider theme={theme}>
                {/* eslint-disable-next-line*/}
                {props.children}
            </ThemeProvider>
        </Merchantcontext.Provider>
    )
}

export default Merchantdata