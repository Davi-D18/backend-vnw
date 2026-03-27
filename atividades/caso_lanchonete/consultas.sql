
-- =========================================================
-- 3. CONSULTAS DE EXEMPLO
-- =========================================================

-- 3.1 Listar pedidos com o nome do cliente
SELECT
    p.id_pedido,
    c.nome AS cliente,
    p.data_hora,
    p.tipo_atendimento,
    p.status
FROM pedido p
JOIN cliente c ON c.id_cliente = p.id_cliente
ORDER BY p.data_hora DESC;

-- 3.2 Listar os itens de um pedido específico
SELECT
    p.id_pedido,
    pr.nome AS produto,
    i.quantidade,
    i.valor_unitario,
    (i.quantidade * i.valor_unitario) AS subtotal
FROM item_pedido i
JOIN pedido p ON p.id_pedido = i.id_pedido
JOIN produto pr ON pr.id_produto = i.id_produto
WHERE p.id_pedido = 1;

-- 3.3 Calcular o total de um pedido
SELECT
    p.id_pedido,
    SUM(i.quantidade * i.valor_unitario) AS total_pedido
FROM pedido p
JOIN item_pedido i ON i.id_pedido = p.id_pedido
WHERE p.id_pedido = 1
GROUP BY p.id_pedido;

-- 3.4 Listar pedidos de um cliente
SELECT
    c.nome AS cliente,
    p.id_pedido,
    p.data_hora,
    p.status
FROM pedido p
JOIN cliente c ON c.id_cliente = p.id_cliente
WHERE c.id_cliente = 1
ORDER BY p.data_hora DESC;

-- 3.5 Listar produtos mais vendidos
SELECT
    pr.nome,
    SUM(i.quantidade) AS total_vendido
FROM item_pedido i
JOIN produto pr ON pr.id_produto = i.id_produto
GROUP BY pr.nome
ORDER BY total_vendido DESC;
