import React, { useEffect, useState } from 'react'
import { Button, Icon, Pagination } from 'semantic-ui-react'
import { participantsData } from '../data/Participants'
import { useRecoilState } from 'recoil'

import { selected as selectedp } from '../data/selected'

export const ParticipantList = () => {

    const numberInList = 20;
    const [page, setPage] = useState([0, numberInList]);
    const [selected, setSelected] = useRecoilState(selectedp);;

    useEffect(() => {
        console.log('page:', page)
    }, [page]);

    useEffect(() => {
        console.log('page:', selected)
    }, [selected]);

    const allParticipants = participantsData

    const pageParticipants = allParticipants.slice(page[0], page[1])

    const sliceData = (data) => {
        console.log((data - 1) * numberInList, ((data - 1) * numberInList) + numberInList)
        setPage([(data - 1) * numberInList, ((data - 1) * numberInList) + numberInList])
    }

    const select = (name) => {
        console.log('this is clicked', name)
        if ((selected.filter(item => item.id === name.id)).length < 1) {
            setSelected([...selected, name])
        }
        else {
                setSelected(selected.filter(item => item.id !== name.id))
        }
    }

    return (
        <>
            <Button.Group fluid basic vertical className='ParticipantButtons'>
                {pageParticipants.map((person) => <Button className={selected.filter(item => item.id === person.id) != 0 ? 'active' : ''} key={person.id} onClick={() => { select(person) }} active={person.id === selected?.person?.id ? true : false}><div className='left'><Icon name='edit' />{person.title}</div> <div className='right'><Icon color={person.icon} name='wifi' /><Icon name='mute' /></div></Button>)}
            </Button.Group>

            <Pagination
                className='Pagination'
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={Math.ceil((allParticipants.length) / numberInList)}
                onPageChange={(event, data) => sliceData(data.activePage)}
            />
        </>)
}
