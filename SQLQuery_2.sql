-- ------------------ tcp/ip porta -----------------
SELECT value_data
FROM sys.dm_server_registry
WHERE registry_key LIKE '%IPALL%'
AND value_name LIKE 'Tcp%Port%'
AND NULLIF(value_data, '') IS NOT NULL
-- -------------------------------------------------

select * from Salas
insert  INTO Salas (nome, capacidade, updateAt) VALUES ('TI', 50, 1)