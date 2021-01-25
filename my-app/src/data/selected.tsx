import {atom} from 'recoil'

import {ParticipantsData} from '../types/types'
const initState: ParticipantsData = {id:-1,title:'',signal:'',icon:''};

export const selected = atom({
    key: "selected",
    default: [initState]
  });