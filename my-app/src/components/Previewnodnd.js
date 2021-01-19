import { Grid, Icon, Button } from 'semantic-ui-react'
import { useRecoilState } from 'recoil'
import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../utils/utils';
import { selected } from '../data/selected'

export const Preview = () => {

  const [wh, setwh] = useState({ 'w': 0, 'h': 0 });;

  const [selectedState, setSelected] = useRecoilState(selected);;

  useEffect(() => {
    console.log('page:', selectedState)
    console.log('number of blocks', selectedState.length)
    let w = Math.ceil(Math.sqrt(selectedState.length))
    let h = Math.ceil(selectedState.length / w) ? Math.ceil(selectedState.length / w) : 0
    setwh({ 'w': w, 'h': h })

  }, [selectedState]);

  const removeFromState = (obj) => {
    setSelected(selectedState.filter(item => item.id !== obj.id))
  }

  const clearSelected = () => {
    setSelected([])
  }

  return (
    <>
      <div>Selected: {selectedState.length} <Button color='red' onClick={() => clearSelected()}>Clear Selection</Button> </div>
      
      <Grid columns={wh.w} className='left'>
        {selectedState.map((sel) =>
          <>
            <Grid.Column padded={false} key={sel.id}>
              <Button icon className='right' onClick={() => removeFromState(sel)}>
                <Icon name='close' />
              </Button>

              <Icon name='bars' size='big' className='left' />
              <div className='VideoStream'></div>
              <div className='PreviewFooter'>
                <h5 className='left'>{sel.title} | {sel.id} | {sel.signal}</h5>
                <Icon className='right' color={sel.icon} name='wifi' /><Icon className='right' name='mute' />
              </div>
            </Grid.Column>

          </>
        )}
      </Grid>
    </>
  )
}

