CREATE DATABASE Controle_de_Estudantes

-- ------------------ tcp/ip porta -----------------
SELECT value_data
FROM sys.dm_server_registry
WHERE registry_key LIKE '%IPALL%'
AND value_name LIKE 'Tcp%Port%'
AND NULLIF(value_data, '') IS NOT NULL
-- -------------------------------------------------

select * from Salas
insert  INTO Salas (nome, capacidade, updateAt) VALUES ('TI', 50, 1)

select * from Alunos
insert into Alunos values('Petter', 20, 'Masculino', 'gato-e-carnivoro2.jpg', GetDate(),GetDate(), 4)
insert into Alunos values('Nycollas', 18, 'Masculino', 'profile_avatar.jpg', GetDate(),GetDate(), 5)
insert into Alunos values('Lucas', 18, 'Masculino', 'Bosch-Logo2.png', GetDate(),GetDate(), 6)


update Alunos 
set Foto = 'profile_avatar.jpg' where IDAluno = 1