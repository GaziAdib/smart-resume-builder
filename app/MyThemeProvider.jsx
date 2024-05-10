"use client";

import { ThemeProvider } from "next-themes";

const MyThemeProvider = ({children}) => {
    return (
        <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
            {children}
        </ThemeProvider>
    );

}

export default MyThemeProvider;


// import { ThemeProvider } from "next-themes";

// const MyThemeProvider = ({children}) => {
//     return (
//         <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
//             {children}
//         </ThemeProvider>
//     );

// }

// export default MyThemeProvider;