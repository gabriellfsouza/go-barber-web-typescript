import React, { useState } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Avatar,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <Avatar>
              <img src={user.avatar_url} alt="Gabriel Lima" />
            </Avatar>
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button onClick={signOut} type="button">
            <FiPower />
          </button>
        </HeaderContent>

        <Content>
          <Schedule>
            <h1>Horários agendados</h1>
            <p>
              <span>Hoje</span>
              <span>Dia 06</span>
              <span>Segunda-feira</span>
            </p>
            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/21299792?s=460&u=7e851b380987e9fc6b17ea74dcac7f417d3f07f5&v=4"
                  alt="Gabriel"
                />
                <strong>Gabriel Lima</strong>
                <span>
                  <FiClock /> 08:00
                </span>
              </div>
            </NextAppointment>

            <Section>
              <strong>Manhã</strong>
              <Appointment>
                <span>
                  <FiClock /> 08:00
                </span>
                <div>
                  <img
                    src="https://avatars0.githubusercontent.com/u/21299792?s=460&u=7e851b380987e9fc6b17ea74dcac7f417d3f07f5&v=4"
                    alt="Gabriel"
                  />
                  <strong>Gabriel Lima</strong>
                </div>
              </Appointment>
              <strong>Tarde</strong>
            </Section>
          </Schedule>
          <Calendar />
        </Content>
      </Header>
    </Container>
  );
};

export default Dashboard;
