import React from "react";

export default function TagsInput(props) {
    const { width, height, user, tags, setTags, setSuccess} = props;

    const [input, setInput] = React.useState('');

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const [isKeyReleased, setIsKeyReleased] = React.useState(false);

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();
        
        if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
            
        }

        if (key === 'Backspace' && !input.length && tags.length && isKeyReleased) {
            e.preventDefault();
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();

            setTags(tagsCopy);
            setInput(poppedTag);
        } 

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
        console.log(tags);
        setTags(tags);
      }


    const deleteTag = (index) => {
        tags.splice(index, 1);
        setTags(prevState => [...prevState]);
        console.log(tags);
      }

    return (
        <div className="container">
            {tags.map((tag, index) => (
                <button className="tag" onClick={() => deleteTag(index)}>{tag}  x</button>
            ))}
            <input
                value={input}
                placeholder="Enter a tag"
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={onChange}
            />
        </div>
    );
}
