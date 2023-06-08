export default function Tag({ text }) {

    const parseTag = (text) => {
      return text.replace(/_/g, ' ');
    };

    return (
      <p style={{display: "inline", marginLeft: "5px", paddingRight: '10px', paddingLeft: '10px', paddingTop: '5px', paddingBottom: '5px', borderRadius: '20px', margin: '3px', backgroundColor: '#5785E8', color: 'white', boxShadow: '1px 2px #D9D9D9' }}>{parseTag(text)}</p>
    );
  }
