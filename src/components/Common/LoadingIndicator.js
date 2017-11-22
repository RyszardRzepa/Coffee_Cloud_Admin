import React from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';

const LoadingIndicator = () => {
  return <Box justify='center' align='center' full>
    <Spinning responsive={true} size={'large'}/>
  </Box>
};

export default LoadingIndicator;