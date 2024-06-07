import { Chart, ChartData, registerables} from 'chart.js';
import React, { useRef, useState, useMemo, useEffect} from 'react'
import { getOrders } from '../http/orderApi';
import { getProducts } from '../http/productApi';
import { IOrder } from '../interfaces/IOrder';
import { IProduct } from '../interfaces/IProduct';
Chart.register(...registerables);

export const Charts = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);

    const fetchProducts = async () => {
      await getProducts().then((data) => setProducts(data));
    }
    const fetchOrders = async () => {
      await getOrders().then((data) => setOrders(data));
    }

    useEffect(() => {
      fetchProducts();
      fetchOrders();
    }, [])
    
    const totalAmount = useMemo<number>(() => {
      return orders.reduce((total, order) => {
        const orderTotal = order?.cart?.cartProducts.reduce((acc, cartProduct) => {
          return acc + (cartProduct.quantity * cartProduct.product?.cost);
        }, 0);
        return total + orderTotal;
      }, 0);
    }, [orders]);

    const chartRef = useRef<Chart | null>(null);

    const chartData = useMemo<ChartData>(() => {
      const productSalesMap: { [productId: number]: number } = {};
      orders.forEach(order => {
        order?.cart?.cartProducts.forEach(cartProduct => {
          const productId = cartProduct.productId;
          if (!productSalesMap[productId]) {
            productSalesMap[productId] = 0;
          }
          productSalesMap[productId] += cartProduct.quantity;
        });
      });

      const labels = products.map(product => product.name);
      const data = products.map(product => productSalesMap[product.id] || 0);
  
      return {
        labels,
        datasets: [{
          label: 'Order Amount',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      };
    }, [orders, products]);


    const canvasCallback = (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (ctx && orders) {
          if (chartRef.current) {
              chartRef.current.destroy();
          }
          chartRef.current = new Chart(ctx, {
              type: 'bar',
              data: chartData,
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              },
          });
      }
  };

      return (
        <div>
            <canvas ref={canvasCallback}></canvas>
            <br />
            <br />
            Total amount: {totalAmount}
        </div>
      )
}
