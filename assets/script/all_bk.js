
new Vue({
    el: '#app',
    data: {
        modalClass: {
            'rotate': false,
            'bg-primary': false,
            'bg-success': false,
        },
        products: [
            {
                id: 1586934917210,
                unit: '杯',
                title: 'Tatami Cup',
                category: '手做陶器',
                content: '手做、柴燒',
                description: '純手工製作，高溫柴燒',
                imageUrl: [
                    'https://rockalen.github.io/sixw6hwdist/assets/images/img-1.jpg'
                ],
                origin_price: 1200,
                price: 1080,
                is_enabled: 1,
                options: {
                    imgStyle: 'card-img',          
                    onSale: 1,
                    order: 1,
                }
            },
            {
                id: 1586934917215,
                unit: '組',
                title: 'Limdae Cup',
                category: '手做陶器',
                content: '柴燒',
                description: '純手工製作，高溫柴燒',
                imageUrl: [
                    'https://rockalen.github.io/sixw6hwdist/assets/images/img-6.jpg'
                ], 
                origin_price: 2800,
                price: 2800,
                is_enabled: 1,
                options: {
                    imgStyle: 'card-img-sm',          
                    onSale: 0,
                    order: 2,
                },
            },
            {
                id: 1196934917910,
                unit: '組',
                title: 'Kabi Mug',
                category: '手做陶器',
                content: '材燒、杯蓋、陶杯組',
                description: '純手工製作，高溫柴燒',
                imageUrl: [
                    'https://rockalen.github.io/sixw6hwdist/assets/images/img-8.jpg'
                ], 
                origin_price: 2800,
                price: 2800,
                is_enabled: 0,
                options: {
                    imgStyle: 'card-img-lg',          
                    onSale: 0,
                    order: 3,
                },        
            },
        ],
        tempProduct: {
            imageUrl: [],
            options: {},
        },
        isNew: true,
    },
    methods: {
        // 更新產品
        updateProduct() {
            if (this.tempProduct.id){
                // 更新產品資料
                this.products.forEach((item,i) => {
                    if (item.id === this.tempProduct.id){
                        // 必須作強制更新才能雙向即時顯示
                        this.$set(this.products, i, this.tempProduct);
                        // this.products[i] = this.tempProduct;
                    }
                });
            }else{
                // 新增一筆產品資料
                const ID = new Date().getTime();
                this.tempProduct.id = ID;
                this.products.push(this.tempProduct);
            }
            // 暫存資料區清空並關閉視窗
            tempProduct =  {};
            $('#productModal').modal('hide');
        },
        // 跳出新增、修改、刪除視窗
        openModal(act, item) {
            switch(act){
                case 'new':
                    this.tempProduct = {
                        imageUrl: [],
                        options: {},
                    };
                    this.modalClass['bg-primary'] = true;
                    this.modalClass['bg-success'] = false;                   
                    this.isNew = true;
                    $('#productModal').modal('show');
                    break;
                case 'edit':
                    this.modalClass['bg-primary'] = false;
                    this.modalClass['bg-success'] = true;
                    this.isNew = false;
                    // this.tempProduct = object.assign({},item);
                    this.tempProduct = JSON.parse(JSON.stringify(item));
                    $('#productModal').modal('show');
                    break;
                case 'delete':
                    this.tempProduct = JSON.parse(JSON.stringify(item));
                    $('#delModal').modal('show');
                    break;
                default:
                    break;
            }
        },
        // 刪除產品函數
        delProduct() {
            // 有此產品ID才可刪除
            if (this.tempProduct.id){
                // 開始比對原始產品資料，條件為暫存產品ID等於原有產品ID，若成立則刪除原資料
                this.products.forEach((item,i) => {
                    if (item.id === this.tempProduct.id){
                        this.products.splice(i,1);
                        this.tempProduct = {
                            imageUrl: [],
                            options: {},
                        };
                    }
                });
            }
            $('#delModal').modal('hide');
        },
        // 設定產品啟用函數
        setEnabled(productItem) {           
            if (productItem.id){
                this.products.forEach((item,i) => {
                    if (productItem.id===item.id){
                        if (item.is_enabled){
                            this.products[i].is_enabled = 0;
                        }else{
                            this.products[i].is_enabled = 1;
                        }
                    }
                });
            }     
          
        },
    },
});