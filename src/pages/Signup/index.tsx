import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Content, Background, Container } from './styles';

const Signup: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logo} alt="GoBarber" />
      <form>
        <h1>Faça seu cadastro</h1>
        <Input icon={FiUser} name="nome" type="text" placeholder="E-mail" />
        <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Senha"
        />
        <Button type="submit">Cadastrar</Button>
      </form>
      <a href="login">
        <FiArrowLeft />
        Voltar para logon
      </a>
    </Content>
  </Container>
);

export default Signup;
