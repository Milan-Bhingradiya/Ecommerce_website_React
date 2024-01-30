
import { blue, grey } from "@mui/material/colors";



export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        //white
                        main: '#ee6666'
                    },
                    secondary: {
                        main: blue[400],
                    },
                    //   neutral: {
                    //     dark: grey[700],
                    //     main: colors.grey[500],
                    //     light: colors.grey[100],
                    //   },
                    background: {
                        default: grey[500],
                    },
                }
                : {
                    // palette values for dark mode
                    primary: {
                        //black
                        main: '#1d1d1d'
                    },
                    secondary: {
                        main: '#ffffff',
                    },
                    //   neutral: {
                    //     dark: grey[700],
                    //     main: colors.grey[500],
                    //     light: colors.grey[100],
                    //   },
                    background: {
                        default: '#f4f4fa',
                    },
                }),
        },
        
    };
};

