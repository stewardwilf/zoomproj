import { Grid, Icon, Button } from 'semantic-ui-react'
import { useRecoilState } from 'recoil'
import React, { useEffect, useState } from 'react'
import { selected } from '../data/selected'
import VirtualDraggableGrid from 'react-virtual-draggable-grid';

export const Preview = () => {

  const [wh, setwh] = useState({ 'w': "0", 'h': "0" });;

  const [selectedState, setSelected] = useRecoilState(selected);;

  useEffect(() => {
    console.log('page:', selectedState)
    console.log('number of blocks', selectedState.length)
    let w = Math.ceil(Math.sqrt(selectedState.length))
    let h = Math.ceil(selectedState.length / w) ? Math.ceil(selectedState.length / w) : 0
    setwh({ 'w': w.toString(), 'h': h.toString() })

  }, [selectedState]);

  const removeFromState = (obj) => {
    setSelected(selectedState.filter(item => item.id !== obj.id))
  }



  return (
    <>
      <div className='left'>
        <Grid columns={wh.w}>
          {selectedState.map((sel) =>
            <>
              <Grid.Column padded={false} key={sel.id}>
                <Button icon className='right' onClick={() => removeFromState(sel)}>
                  <Icon name='close' />
                </Button>

                <Icon name='bars' size='big' className='left' />
                <div className='VideoStream'></div>
                <div className='PreviewFooter'>
                  <h5 className='left'>{sel.title} </h5>
                  <Icon className='right' color={sel.icon} name='wifi' /><Icon className='right' name='mute' />
                </div>
              </Grid.Column>

            </>
          )}

        </Grid>
      </div>
    </>
  )
}

