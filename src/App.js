import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormPage.css';
 
const FormPage = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    address: '',
    registration: '',
    dateBirth: '',
  });
  
  const [discipline, setDiscipline] = useState({
    name: '',
    workload: '',
  });
 
  const [studentDiscipline, setStudentDiscipline] = useState({
    name: '',
    note: '',
    frequency: '',
    studentId: '', 
    disciplineId: '', // ID da disciplina
  });
 
  const [activeTab, setActiveTab] = useState('student');
  const [studentDisciplineRecords, setStudentDisciplineRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
 
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:8080/student');
        const disciplinesResponse = await axios.get('http://localhost:8080/discipline');
        setStudents(studentsResponse.data);
        setDisciplines(disciplinesResponse.data);
      } catch (error) {
        console.error('Erro ao carregar opções:', error);
      }
    };
 
    loadOptions();
  }, []);
 
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };
 
  const handleDisciplineChange = (e) => {
    const { name, value } = e.target;
    setDiscipline({
      ...discipline,
      [name]: value,
    });
  };
 
  const handleStudentDisciplineChange = (e) => {
    const { name, value } = e.target;
    setStudentDiscipline({
      ...studentDiscipline,
      [name]: value,
    });
  };
 
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
 
    try {
      await axios.post('http://localhost:8080/student', student);
      alert('Aluno cadastrado com sucesso!');
      setStudent({
        name: '',
        email: '',
        address: '',
        registration: '',
        dateBirth: '',
      });
    } catch (error) {
      alert('Erro ao cadastrar aluno.');
      console.error(error);
    }
  };
 
  const handleDisciplineSubmit = async (e) => {
    e.preventDefault();
 
    try {
      await axios.post('http://localhost:8080/discipline', discipline);
      alert('Disciplina cadastrada com sucesso!');
      setDiscipline({
        name: '',
        workload: '',
      });
    } catch (error) {
      alert('Erro ao cadastrar disciplina.');
      console.error(error);
    }
  };
 
  const handleStudentDisciplineSubmit = async (e) => {
    e.preventDefault();
 
    // Verifica se os IDs do aluno e da disciplina estão definidos
    if (!studentDiscipline.studentId || !studentDiscipline.disciplineId) {
      alert('Por favor, selecione um aluno e uma disciplina.');
      return;
    }
 
    try {
      await axios.post('http://localhost:8080/student-discipline', studentDiscipline);
      alert('Registro de Disciplina cadastrado com sucesso!');
      setStudentDiscipline({
        name: '',
        note: '',
        frequency: '',
        studentId: '', // Reseta o ID do aluno
        disciplineId: '', // Reseta o ID da disciplina
      });
      loadStudentDisciplineRecords();
    } catch (error) {
      alert('Erro ao cadastrar registro de disciplina.');
      console.error(error);
    }
  };
 
  const loadStudentDisciplineRecords = async () => {
    try {
      const response = await axios.get('http://localhost:8080/student-discipline');
      setStudentDisciplineRecords(response.data);
    } catch (error) {
      console.error('Erro ao carregar registros de disciplinas:', error);
    }
  };
 
  return (
    <div className="container">
      <div className="header">
        <h1>Cadastro</h1>
      </div>
 
      <div className="nav-buttons">
        <button
          onClick={() => setActiveTab('student')}
          className={`nav-button ${activeTab === 'student' ? 'active' : 'inactive'}`}
        >
          Cadastro de Aluno
        </button>
        <button
          onClick={() => setActiveTab('discipline')}
          className={`nav-button ${activeTab === 'discipline' ? 'active' : 'inactive'}`}
        >
          Cadastro de Disciplina
        </button>
        <button
          onClick={() => setActiveTab('student-discipline')}
          className={`nav-button ${activeTab === 'student-discipline' ? 'active' : 'inactive'}`}
        >
          Cadastro de Registro de Disciplina
        </button>
      </div>
 
      {activeTab === 'student' && (
        <div className="form-section">
          <h2>Cadastro de Aluno</h2>
          <form onSubmit={handleStudentSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={student.name}
                onChange={handleStudentChange}
                required
              />
            </div>
 
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={student.email}
                onChange={handleStudentChange}
                required
              />
            </div>
 
            <div className="form-group">
              <label htmlFor="address">Endereço:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={student.address}
                onChange={handleStudentChange}
                required
              />
            </div>
 
            <div className="form-group">
              <label htmlFor="registration">Matrícula:</label>
              <input
                type="text"
                id="registration"
                name="registration"
                value={student.registration}
                onChange={handleStudentChange}
                required
              />
            </div>
 
            <div className="form-group">
              <label htmlFor="dateBirth">Data de Nascimento:</label>
              <input
                type="date"
                id="dateBirth"
                name="dateBirth"
                value={student.dateBirth}
                onChange={handleStudentChange}
                required
              />
            </div>
 
            <button type="submit" className="form-button">
              Cadastrar Aluno
            </button>
          </form>
        </div>
      )}
 
      {activeTab === 'discipline' && (
        <div className="form-section">
          <h2>Cadastro de Disciplina</h2>
          <form onSubmit={handleDisciplineSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={discipline.name}
                onChange={handleDisciplineChange}
                required
              />
            </div>
 
            <div className="form-group">
              <label htmlFor="workload">Carga Horária:</label>
              <input
                type="text"
                id="workload"
                name="workload"
                value={discipline.workload}
                onChange={handleDisciplineChange}
                required
              />
            </div>
 
            <button type="submit" className="form-button">
              Cadastrar Disciplina
            </button>
          </form>
        </div>
      )}
 
      {activeTab === 'student-discipline' && (
        <div className="form-section">
          <h2>Cadastro de Registro de Disciplina</h2>
          <form onSubmit={handleStudentDisciplineSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={studentDiscipline.name}
                onChange={handleStudentDisciplineChange}
                required
              />
            </div>
 
            <div className="form-group">
              <label htmlFor="note">Nota:</label>
              <input
                type="number"
                step="0.01"
                id="note"
                name="note"
                value={studentDiscipline.note}
                onChange={handleStudentDisciplineChange}
                required
              />
            </div>
 
            <div className="form-group">
              <label htmlFor="frequency">Frequência:</label>
              <input
                type="number"
                step="0.01"
                id="frequency"
                name="frequency"
                value={studentDiscipline.frequency}
                onChange={handleStudentDisciplineChange}
                required
              />
            </div>
 
            <div className="form-group">
              <label htmlFor="studentId">Aluno:</label>
              <select
                id="studentId"
                name="studentId"
                value={studentDiscipline.studentId}
                onChange={handleStudentDisciplineChange}
                required
              >
                <option value="">Selecione um aluno</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
 
            <div className="form-group">
              <label htmlFor="disciplineId">Disciplina:</label>
              <select
                id="disciplineId"
                name="disciplineId"
                value={studentDiscipline.disciplineId}
                onChange={handleStudentDisciplineChange}
                required
              >
                <option value="">Selecione uma disciplina</option>
                {disciplines.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
 
            <button type="submit" className="form-button">
              Cadastrar Registro de Disciplina
            </button>
          </form>
 
          <div className="records-list">
            <h3>Registros de Disciplinas</h3>
            <ul>
              {studentDisciplineRecords.map((record) => (
                <li key={record.id}>
                  <strong>Nome:</strong> {record.name} | <strong>Nota:</strong> {record.note} | <strong>Frequência:</strong> {record.frequency} | <strong>Aluno:</strong> {record.student?.name} | <strong>Disciplina:</strong> {record.discipline?.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default FormPage;