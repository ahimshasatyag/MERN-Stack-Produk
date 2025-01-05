import React, {useRef} from 'react';

export default function DeleteProduk({ handleUserDelet }) {
    const closeRef = useRef();
    return (
        <>
            <div id="deleteProductModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h4 className="modal-title">Delete Produk</h4>
                            </div>
                            <div className="modal-body">
                                <p>Apakah yakin ingin menghapus ini?</p>
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-bs-dismiss="modal" value="Cancel" ref={closeRef} onFocus={(e) => e.target.blur()} />
                                <input type="button" className="btn btn-danger" value="Delete" data-bs-dismiss="modal" onClick={handleUserDelet} ref={closeRef} onFocus={(e) => e.target.blur()} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
