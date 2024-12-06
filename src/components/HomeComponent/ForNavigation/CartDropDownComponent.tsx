import { Box, Button, CardContent, Divider, Typography, useTheme } from "@mui/material";
import IconifyIcon from "../../iconifyIcon";
import { useMemo } from "react";


const CartDropDownComponent = () => {

    const totalMoney = useMemo(() => 0,[]);
    const theme = useTheme();

    const renderCart = () => {
        return (<>
            <Box sx={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                gap:"1rem"
            }}>
                <IconifyIcon fontSize={"2.5rem"} icon={"cil:cart"}/>
                <Typography fontSize={"0.85rem"}>Hiện chưa có sản phẩm</Typography>
            </Box>
        </>)
    }

    return (
        <>
            <CardContent>
                <Typography fontSize={"1.3rem"} fontWeight={"500"} letterSpacing={"1px"}>Giỏ hàng</Typography>
            </CardContent>
            <Divider/>
            <CardContent>
                {renderCart()}
            </CardContent>
            <Divider/>
            <CardContent>
                <Box sx={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}>
                    <Typography fontWeight={"bold"}>Tổng tiền:</Typography>
                    <Typography fontWeight={"bold"} color={theme.palette.primary.main}>{totalMoney}đ</Typography>
                </Box>
            </CardContent>
            <Button variant="contained" fullWidth>Xem giỏ hàng</Button>
        </>
    )
}


export default CartDropDownComponent;