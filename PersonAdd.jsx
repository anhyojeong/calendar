const React = require('react');
const {useState, useEffect} = require('react');
const  {LoadPeople}  = require('./LoadPeople');
require('./css/personArea.css');

const PersonAdd = ()=>{
    const [personName,setPersonName]=useState('');
    const [people, setPeople] = useState([]);
    const [message, setMessage] = useState('');
    const { data, saveData } = LoadPeople({ initialDataKey: 'people' });
    const colors = ['#D2D0F7', '#B2D4D1', '#D9EBD1', '#D4CCB2', '#DB7093	'];
    
    useEffect(() => {
        // 로컬스토리지에서 저장된 사람들의 정보를 가져옴
        const savedPeople = localStorage.getItem('people');
        if (savedPeople) {
          setPeople(JSON.parse(savedPeople));
        }
      }, []);
      
    // people 상태가 변경될 때마다 로컬스토리지에 저장
      useEffect(() => {
        localStorage.setItem('people', JSON.stringify(people));
      }, [people]);

    //사람 추가
    const handleAddBtnClick =()=>{
        //입력된 이름 가져오기 
        const inputName = document.getElementById('personName');
        const name = inputName.value;

        //이름 입력 유무 확인
        if(!name){
            setMessage('이름을 입력해주세요');
            return;
        }
        else{
            setPersonName(name);
        }

        // 이미 등록된 이름인지 확인
        const isNameExist = people.some(person => person.name === name);
        if (isNameExist) {
            setMessage('이미 등록된 이름입니다');
            return;
        }

        //추가된 사람에게 색상 할당
        const assignedColor = colors.find(color => !people.some(person => person.color === color));
        
        //새로운 사람 객체 생성
        const newPerson = {
            name: name,
            color: assignedColor
        };
    
        // 새로운 사람 추가
        setPeople([...people, newPerson]);
        setMessage('추가되었습니다');

        //3초 지나서 메시지 초기화
        setTimeout(() => {
            setMessage('');
          }, 1500);
    }

    //사람 삭제
    const handleDeletePerson = (name) => {
        const updatedPeople = people.filter(person => person.name !== name);
        setPeople(updatedPeople);
    }
    return(
        <div id= 'personArea'>
            <div id ='inputArea'> 
                <label>이름 : </label>
                <input 
                    id ='personName' 
                    type='text' 
                    name='name'
                    placeholder='본인 이름을 입력해주세요'
                    value={personName}
                    onChange={e=>setPersonName(e.target.value)}
                />
                <button id ='addBtn' onClick={handleAddBtnClick}>추가</button>
            </div>
            <p id ='message'>{message}</p>
            <div id='savedPeopleArea'>
                {people.length > 0 ? (
                people.map(person => (
                    <div className='savedPersonName' key={person.name}>
                        <span style={{ backgroundColor: person.color}}>{person.name}</span>
                        <button id ='removeBtn' onClick={() => handleDeletePerson(person.name)}>삭제</button>
                    </div>
                ))
                ) : (
                null
                )}
            </div>
        </div>
    )
}
module.exports = PersonAdd;