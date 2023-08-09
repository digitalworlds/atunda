import React from "react";

export default function TagsInput(props) {
    const { width, height, user, onQuery } = props;

    const [input, setInput] = React.useState('');
    const [tags, setTags] = React.useState([]);

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
        onQuery(tags);
      }


    const deleteTag = (index) => {
        tags.splice(index, 1);
        setTags(prevState => [...prevState]);
        console.log(tags);
        onQuery(tags)
        if (tags == '') {
            onQuery('');
        }
      }

    return (
        <div className="container">
            {tags.map((tag, index) => (
            <div className="tag">
                {tag}
                <button onClick={() => deleteTag(index)}>x</button>
            </div>
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
