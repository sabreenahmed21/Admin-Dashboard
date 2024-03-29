// @ts-nocheck
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline
} from "@mui/material";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import {  themeSettings} from './theme';
import Layout from "Pages/Layout";
import Dashboard from "Pages/Dashboard";
import Products from "Pages/Products";
import Customers from "Pages/Customers";
import Transactions from "Pages/Transactions";
import Geography from "Pages/Geography";
import Overall from "Pages/Overall";
import Daily from "Pages/Daily";
import Monthly from "Pages/Monthly";
import Breakdown from "Pages/Breakdown";
import Admin from "Pages/Admin";
import Performance from "Pages/Performance";
import NotFound from "Pages/NotFound";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to='/dashboard' replace />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />}/>
              <Route path="/transactions" element={<Transactions />}/>
              <Route path="/geography" element={<Geography/>} />
              <Route path="/overview" element={<Overall />} />
              <Route path='/daily' element={<Daily />}/>
              <Route path="/monthly" element={<Monthly />}/>
              <Route path="/breakdown" element={<Breakdown />}/>
              <Route path="/admin" element={<Admin />}/>
              <Route path='/performance' element={<Performance />}/>
              <Route path="*" element={<NotFound />}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;