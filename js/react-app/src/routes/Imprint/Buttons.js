/* eslint-disable */

import React from 'react';
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '../../common/components/Button/Button';

const Buttons = ({ }) => (<div>
    <Grid container direction="column">
        <Grid item>
            <Typography variant="title" style={{ margin: '10 0', borderBottom: '1px solid #000' }} > Buttons</Typography>
        </Grid>
        <Grid item>
            <Grid container>
                <Grid style={{ margin: '20px' }} item>
                    <Grid container >
                        <Grid style={{ backgroundColor: '#000', padding: '10px' }} item>
                            <Button variant="outlined" color="secondary">
                                Button
                                </Button>
                        </Grid>
                        <Grid style={{ backgroundColor: '#000', padding: '10px' }} item>
                            <Button variant="contained" color="secondary">
                                Button
                                </Button>
                        </Grid>
                        <Grid style={{ padding: '10px' }} item>
                            <Button variant="contained" color="primary">
                                Button
                                </Button>
                        </Grid>
                        <Grid style={{ padding: '10px' }} item>
                            <Button variant="text" >
                                Button
                                </Button>
                        </Grid>
                        <Grid style={{ padding: '10px' }} item>
                            <Button variant="text" color="secondary" >
                                Button
                                </Button>
                        </Grid>
                        <Grid style={{ padding: '10px' }} item>
                            <Button variant="text" color="primary" >
                                Button
                                </Button>
                        </Grid>
                    </Grid>

                    <Grid style={{ margin: '10 0' }}  container>
                        <Grid item>
                            <Typography variant="title" > Disabled </Typography>
                        </Grid>
                    </Grid>

                    <Grid container >
                        <Grid style={{ backgroundColor: '#000', padding: '10px' }} item>
                            <Button variant="outlined" disabled={true} color="secondary">
                                Button
                                </Button>
                        </Grid>
                        <Grid style={{ backgroundColor: '#000', padding: '10px' }} item>
                            <Button variant="contained" disabled={true} color="secondary">
                                Button
                                </Button>
                        </Grid>
                        <Grid style={{ padding: '10px' }} item>
                            <Button variant="contained" disabled={true} color="primary">
                                Button
                                </Button>
                        </Grid>
                        <Grid style={{ padding: '10px' }} item>
                            <Button variant="text" disabled={true} >
                                Button
                                </Button>
                        </Grid>
                        <Grid style={{ padding: '10px' }} item>
                            <Button variant="text" disabled={true} color="secondary" >
                                Button
                                </Button>
                        </Grid>
                        <Grid style={{ padding: '10px' }} item>
                            <Button variant="text" disabled={true} color="primary" >
                                Button
                                </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    </Grid></div>)
export default Buttons;
