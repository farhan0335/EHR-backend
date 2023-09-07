import {diskStorage} from 'multer'
import { extname } from 'path'
export const multerConfige = {
    storage : diskStorage({
        destination : (req, file, cb) =>{
            cb(null, './uploads');
        },
        filename : (req, file, cb) => { 
            const randomName = Array(32)
            .file(null).map(()=>Math.round(Math.random()))
        }
    })
}