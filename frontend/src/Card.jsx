import { Image, Text, Button, VStack } from '@chakra-ui/react'
import React from 'react'

const Card = ({amount,img, checkoutHandler}) => {
  return (
    <VStack>
        <Image src={img} boxSize={"150"} objectFit="contain"/>
        <Text>₹{amount}</Text>
        <Button onClick={()=>checkoutHandler(amount)}>Buy Now</Button>
    </VStack>
  )
}

export default Card