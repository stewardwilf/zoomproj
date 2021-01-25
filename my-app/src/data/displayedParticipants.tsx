import {atom} from 'recoil'
import { participantsData } from './Participants'

export const displayed = atom({
    key: "displayed",
    default: participantsData
  });