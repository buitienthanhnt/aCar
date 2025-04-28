import {check, Permission, request, RESULTS} from 'react-native-permissions';
import {showMessage} from 'react-native-flash-message';

export const requestPermisssion = (permissionName: Permission, callback?: ()=> void)=>{
    check(permissionName).then(result => {
        switch (result) {
            case RESULTS.UNAVAILABLE:
            case RESULTS.DENIED:
                request(permissionName as Permission).then(()=>{
                    callback?.();
                });
                break;
            case RESULTS.LIMITED:
            case RESULTS.GRANTED:
                callback?.();
                break;
            case RESULTS.BLOCKED:
                showMessage({
                    message: 'Bạn chưa cấp quyền cho tính năng này',
                    type: 'warning',
                });
        }
    });
    return;
};
