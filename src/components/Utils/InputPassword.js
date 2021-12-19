import React, {useState} from 'react';


function InputPassword (props) {

    const visibleIcon = 'icon-visibility';
    const hiddenIcon = 'icon-visibility_off';

    const [visiblePassword, setVisiblePassword] = useState(0);

    return (
        <div className={'input-group mb-3'}>
            <div className={"group-icon-help"} onClick={e => setVisiblePassword((visiblePassword === 0) ? 1 : 0)}>
                <i className={'icon ' + ((visiblePassword === 0) ? hiddenIcon : visibleIcon)}/>
            </div>
            <input {...props} className="form-control" type={(visiblePassword === 0) ? 'password' : 'text'} />
        </div>
    );
}

export default InputPassword;
