// import React from 'react'

// function Home() {
//   return (
//     <div>
//       Home
//     </div>
//   )
// }

import React from 'react'
import {Box, Stack} from "@chakra-ui/react";
import Card from "./Card";
import axios from "axios";

const Home = () => {

    const checkoutHandler =async (amount) => {
        const {data: {key}} = await axios.get("http://localhost:8081/api/getkey");
        const { data:{order} }  = await axios.post("http://localhost:8081/api/checkout",{amount})
        
        const options = {
            key: key, // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Teena",
            description: "Razorpay project",
            image: "https://example.com/your_logo",
            order_id: order.id, 
            callback_url: "http://localhost:8081/api/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options)
        razor.open();
    }


  return (
    <Box>

        <Stack h={"100vh"} alignItems={"center"} justifyContent={"center"} direction={["column", "row"]}  >

            <Card amount={5000} img={"https://th.bing.com/th/id/OIP.MtyiC_lyalSqPkqNh9xxgAHaFj?rs=1&pid=ImgDetMain"} checkoutHandler={checkoutHandler} />
            <Card amount={3000} img={"https://th.bing.com/th/id/OIP.84_7c4VYIRRl_m7ul34-4wHaFI?rs=1&pid=ImgDetMain"} checkoutHandler={checkoutHandler} />
        </Stack>
    </Box>
  )
}

export default Home;
