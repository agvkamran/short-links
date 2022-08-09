import { useForm } from "react-hook-form";
import { createShortLink, selectLinks, selectLoading } from 'store/slice/linkSlice';
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const state = useSelector(state => state);
    console.log('lll', state)
    console.log(loading)
    const links = useSelector(selectLinks);
    console.log(links);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        mode: 'onSubmit'
    })

    const onSubmit = ({ Url }) => {
        console.log(Url)
        dispatch(createShortLink(Url));
        reset();
    }

    return (
        <div className="container">
            <form
                className="form"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    type="url"
                    placeholder="Shorten a like here..."
                    className="input"
                    {...register('Url', {
                        required: 'Please add a link',
                        pattern: {
                            value: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                            message: 'Please enter a valid url'
                        }
                    })}
                    disabled={loading === 'loading'}
                />
                <button type='onSubmit' disabled={loading === 'loading'}>Button</button>
                {errors.Url && (
                    <div className="error">
                        {errors.Url.message}
                    </div>
                )}
            </form>
            <ul>
                {links?.map((link) => {
                    return (
                        <li key={link.code}>{link.full_short_link}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Form;