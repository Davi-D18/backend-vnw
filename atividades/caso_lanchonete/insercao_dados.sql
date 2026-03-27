-- =========================================================
-- 2. INSERÇÃO DE DADOS DE EXEMPLO
-- =========================================================

INSERT INTO cliente (nome, telefone, email)
VALUES
('Carlos Silva', '44999990001', 'carlos@email.com'),
('Mariana Souza', '44999990002', 'mariana@email.com'),
('João Ferreira', '44999990003', 'joao@email.com');

INSERT INTO produto (nome, descricao, preco)
VALUES
('X-Burguer', 'Hambúrguer com queijo, alface e tomate', 18.00),
('X-Salada', 'Hambúrguer com queijo, alface, tomate e maionese', 20.00),
('Refrigerante', 'Lata 350ml', 6.00),
('Batata Frita', 'Porção pequena', 12.00);

INSERT INTO pedido (id_cliente, tipo_atendimento, status)
VALUES
(1, 'retirada', 'aberto'),
(2, 'local', 'em_preparo'),
(3, 'retirada', 'finalizado');

INSERT INTO item_pedido (id_pedido, id_produto, quantidade, valor_unitario)
VALUES
(1, 1, 2, 18.00),
(1, 3, 2, 6.00),
(2, 2, 1, 20.00),
(2, 4, 1, 12.00),
(3, 1, 1, 18.00),
(3, 3, 1, 6.00);
