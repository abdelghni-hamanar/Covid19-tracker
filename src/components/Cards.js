import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import React from 'react';

function Cards({title,cases,total,type}) { 
    const classname = type === "infected"  ? "Card infected" : type === "recovered" ? "Card recovered" : "Card deaths";
  return (
    <Grid item component={Card} xs={12} md={3} className={classname}>
    <CardContent>
        <Typography color="textSecondary" gutterBottom>{title}</Typography>
        <Typography variant='h5'>
            <CountUp start={0} end={cases} duration={2.5} separator=","/>
        </Typography>
        <Typography variant="body2"><CountUp start={0} end={total} duration={2.5} separator=","/></Typography>
    </CardContent>
</Grid>
  )
}

export default Cards