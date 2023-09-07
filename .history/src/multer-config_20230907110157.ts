import {diskStorage} from 'multer'
import { extname } from 'path'
export const multerConfige = {
    storage : diskStorage({
        destination : (req, file, cb) =>{
            cb(null, './uploads');
        }
        filename : (req, file, )
    })
}