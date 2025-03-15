import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Card, Typography, message } from 'antd';
import { createSimulation } from '@info-ai/web-support/services/api';
import { useChatStore } from '@info-ai/web-support/store/chatStore';

const { TextArea } = Input;
const { Title } = Typography;

interface SimulationFormProps {
  onSuccess?: () => void;
}

const SimulationForm: React.FC<SimulationFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setSimulationId, reset } = useChatStore();
  
  const handleSubmit = async (values: any) => {
    setLoading(true);
    
    try {
      // 重置聊天状态
      reset();
      
      // 创建新模拟
      const result = await createSimulation({
        personality: values.personality,
        background: values.background,
        rounds: values.rounds
      });
      
      setSimulationId(result.id);
      message.success('模拟创建成功');
      onSuccess?.();
      
      // 重置表单
      form.resetFields();
    } catch (error) {
      console.error('创建模拟失败:', error);
      message.error('创建模拟失败');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card variant="borderless" className="shadow-none">
      <Title level={5}>创建新模拟</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          personality: "adaptable and hardworking",
          background: "a computer science graduate with 5 years of experience",
          rounds: 5
        }}
        className="mt-4"
      >
        <Form.Item
          name="personality"
          label="性格特点"
          rules={[{ required: true, message: '请输入性格特点' }]}
        >
          <Input placeholder="例如：adaptable and hardworking" />
        </Form.Item>
        
        <Form.Item
          name="background"
          label="背景经历"
          rules={[{ required: true, message: '请输入背景经历' }]}
        >
          <TextArea 
            placeholder="例如：a computer science graduate with 5 years of experience" 
            rows={3}
          />
        </Form.Item>
        
        <Form.Item
          name="rounds"
          label="模拟轮数"
          rules={[
            { required: true, message: '请输入模拟轮数' },
            { type: 'number', min: 1, max: 10, message: '轮数必须在1-10之间' }
          ]}
        >
          <InputNumber min={1} max={10} className="w-full" />
        </Form.Item>
        
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block
            className="mt-2"
          >
            开始模拟
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SimulationForm; 