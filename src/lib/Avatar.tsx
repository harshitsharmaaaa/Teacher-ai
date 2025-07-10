import { createAvatar } from "@dicebear/core";
import { initials, botttsNeutral } from "@dicebear/collection";

interface AvatarProps{
    seed:string,
    varient:"bottsNeutral"|"initials"
}

export const generateAvatarUri = ({seed,varient}: AvatarProps) => {
    let avatar;
    if(varient==="bottsNeutral"){
        avatar = createAvatar(botttsNeutral, {
            seed,
        });
    }else{
        avatar = createAvatar(initials, {
            seed,
            fontWeight:500 ,
            fontSize: 42,
        });
    }
    return avatar.toDataUri();
};