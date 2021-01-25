import { Grid, Icon, Button } from 'semantic-ui-react'
import { useRecoilState } from 'recoil'
import React, { useEffect, useState } from 'react'
import { selected } from '../data/selected'
import { ParticipantsData } from '../types/types'
import { SemanticWIDTHSNUMBER } from 'semantic-ui-react/dist/commonjs/generic'

export const Preview = () => {
  const [selectedState, setSelected] = useRecoilState(selected);
  const [wh, setwh] = useState<SemanticWIDTHSNUMBER>(1);

  useEffect(() => { // recalculate number of rows/ columns when selections change
    setwh((Math.ceil(Math.sqrt(selectedState.length)) ? Math.ceil(Math.sqrt(selectedState.length)) : 1) as SemanticWIDTHSNUMBER)
    //let h:number = (Math.ceil(selectedState.length / w) ? Math.ceil(selectedState.length / w) : 1)
  }, [selectedState]);

  const removeFromState = (obj: ParticipantsData) => { //filter out removed item
    setSelected(selectedState.filter((item: ParticipantsData) => item.id !== obj.id))
  }

  return (
    <>
      <div className='left'>
        <Grid columns={wh}>
          {selectedState.map((sel: ParticipantsData) =>
            <>
              <Grid.Column padded="false" key={sel.id}>
                <Button icon className='right' onClick={() => removeFromState(sel)}>
                  <Icon name='close' />
                </Button>
                <Icon name='bars' size='big' className='left' />
                <div className='VideoStream'></div>
                <div className='PreviewFooter'>
                  <h5 className='left'>{sel.title} </h5>
                  <Icon className='right' color={sel.icon ? sel.icon : 'black'} name='wifi' /><Icon className='right' name='mute' />
                </div>
              </Grid.Column>
            </>
          )}
        </Grid>
      </div>
    </>
  )
}
