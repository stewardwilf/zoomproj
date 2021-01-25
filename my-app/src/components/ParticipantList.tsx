import React, { useState, useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { displayed } from '../data/displayedParticipants'
import { useRecoilState } from 'recoil'
import { Container, Draggable } from 'react-smooth-dnd';
import { selected as selectedp } from '../data/selected'
import {ParticipantsData} from '../types/types'

export const ParticipantList = () => {
    const [selected, setSelected] = useRecoilState<ParticipantsData[]>(selectedp);
    const [participantsData] = useRecoilState(displayed);
    const [showSelected, setShowSelected] = useState(false);

    useEffect(() => { //Remove default recoil value - do this in a cleaner way
      setSelected([])
     }, []);

    const select = (name: ParticipantsData) => { //select individuals from list
        if ((selected.filter((item:ParticipantsData) => item.id === name.id)).length < 1) {
            setSelected([...selected,name])
        }
        else {
            setSelected(selected.filter((item:ParticipantsData) => item.id !== name.id))
        }
    }

    const reorderSelection = (event: any) => { //reorder selection on drag
        let copy = [...selected]
        copy.splice(event.removedIndex, 1); //remove one item where we pick element from
        copy.splice(event.addedIndex, 0, selected[event.removedIndex]); //add removed item to new position
        setSelected(copy)
    }

    const Selected = () => {
        return (
            <Button.Group fluid basic vertical className='ParticipantButtons'>
                <Container dragHandleSelector=".column-drag-handle" onDrop={e => reorderSelection(e)}>
                    {selected.map((p:ParticipantsData) => {
                        return (
                            <Draggable key={p.id}>
                                <Button className="draggable-item" active={true}>
                                    <span className="column-drag-handle">
                                        <div className='left'>
                                            <Icon name='edit' />
                                            {p.title}
                                        </div>
                                        <div className='right'>
                                            <Icon color={p.icon} name='wifi' />
                                            <Icon name='mute' />
                                        &#x2630;
                                    </div>
                                    </span>
                                </Button>
                            </Draggable>
                        );
                    })}
                </Container>
            </Button.Group>
        )
    }

    const Selector = () => {
        return (<Button.Group fluid basic vertical className='ParticipantButtons'>
            {participantsData.map((person:ParticipantsData) =>
                <Button 
                //className={selected.filter((item:ParticipantsData) => item.id === person.id) !== 0 ? 'active' : ''} 
                key={person.id} 
                onClick={() => { select(person) }} 
                active={selected.filter((item: ParticipantsData)=> item.id === person.id).length !=0 ? true : false}
                >
                    <div>
                        <div className='left'>
                            <Icon name='edit' />
                            {person.title}
                        </div> 
                        <div className='right'>
                            <Icon color={person.icon} name='wifi' />
                            <Icon name='mute' />
                            
                        </div>
                    </div>
                </Button>)}
        </Button.Group>
        )
    }
    const show = () => {
        if (showSelected) {
            setShowSelected(false)
        }
        else {
            setShowSelected(true)
        }
    }
    const clearSelected = () => {
        setSelected([])
      }
    return (
        <>
            <Button onClick={() => show()}>{showSelected ? 'Show All' : 'Show Selected'}</Button>
            {selected.length>0 ? <Button color='red' onClick={() => clearSelected()}>Clear Selection</Button> : <></>}
            { showSelected ? <Selected /> : <Selector />}
        </>)
}
