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

  const reorderSelection = (event) => {
    let copy = [...selectedState]
    copy.splice(event.removedIndex, 1); //remove one item where we pick element from
    copy.splice(event.addedIndex, 0, selectedState[event.removedIndex]); //add
    setSelected(copy)
  }
  return (
    <>
      <div>Selected: {selectedState.length} <Button color='red' onClick={() => clearSelected()}>Clear Selection</Button> </div>

      <div className="simple-page">
        <Grid columns={wh.w} className='left'>
          <Container className='container' dragHandleSelector=".column-drag-handle" onDrop={e => reorderSelection(e)}>
            {selectedState.map(p => {
              return (
                <Draggable key={p.id}>
                  <Grid.Column padded={false}>
                    <div className="draggable-item">
                      <span className="column-drag-handle">&#x2630; {p.id}</span>
                      <Button icon className='right' onClick={() => removeFromState(p)}>
                        <Icon name='close' />
                      </Button>
                      <div className='VideoStream'></div>
                      <div className='PreviewFooter'>
                        <h5 className='left'>{p.title} | {p.id} | {p.signal}</h5>
                        <Icon className='right' color={p.icon} name='wifi' /><Icon className='right' name='mute' />
                      </div>
                    </div>
                  </Grid.Column>
                </Draggable>
              );
            })}
          </Container>
        </Grid>
      </div>
    </>
  )

}

