/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, StyleSheet, Button,TouchableOpacity } from 'react-native';

const UpdateProductDetails = ({ route }) => {
    const { id } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                if (!id) {
                    throw new Error('Product ID is missing.');
                }
    
                const response = await fetch(`https://freetestapi.com/api/v1/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
    
                const productData = await response.json();
                setProduct(productData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
    
        fetchProductDetails();
    }, [id]);
    
    const handleInputChange = (field, value) => {
        setProduct((prevProduct) => ({ ...prevProduct, [field]: value }));
    };
    

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Failed to save product changes');
            }

            alert('Product details updated successfully!');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Product not found or ID missing.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={styles.backButton}>
                      <Text style={styles.arrowText}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Update Product Details</Text>
                  </View>
            <Text style={styles.label}>Product Name:</Text>
            <TextInput
                style={styles.input}
                value={product.name}
                onChangeText={(text) => handleInputChange('name', text)}
            />

            <Text style={styles.label}>Product Description:</Text>
            <TextInput
                style={styles.input}
                value={product.description}
                onChangeText={(text) => handleInputChange('description', text)}
            />

            <Text style={styles.label}>Product Price:</Text>
            <TextInput
                style={styles.input}
                value={String(product.price)}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('price', parseFloat(text))}
            />

            <Button title="Save Changes" onPress={handleSaveChanges} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor:'#5f9ea0',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    arrowText: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 100,
      },
});

export default UpdateProductDetails;
