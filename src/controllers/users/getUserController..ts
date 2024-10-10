import { Response, Request} from "express"
import UserService from "../../database/repositories/userRepository"

interface IQuery {
    id: string
}

export const getUserController = async (req: Request<any, unknown, {},IQuery>, res: Response) => {
    try {
        const userId = Number(req.query.id);
    
        if(!userId) {
            res.status(404).send('id not find');
        }
    
        const user = await UserService.getOneById(userId);
    
        if(!user) {
            res.status(404).send('user not find');
            return;
        }
    
        res.status(200).send(user);
        
    } catch (error) {
        res.status(500).send(`${error}`);
    }


}