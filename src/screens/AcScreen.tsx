import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
import {ScrollView, Text, View} from "react-native";
import FormInput from "@elements/FormInput.tsx";

const defaultValue: any = {
	thapMin: 1.5,
	thapMax: 2.5,
	caoMin: 13.7,
	caoMax: 15.7,
};

const AcScreen = ()=>{
	const [thap, setThap] = useState<number>(0);
	const [cao, setCao] = useState<number>(0);

	const upThap = useCallback((val: string) => {
		setThap(val as unknown as number);
	}, [])

	const upCao = useCallback((val: string) => {
		setCao(val as unknown as number);
	}, [])

	const error = useMemo(() =>{
		if ((thap > defaultValue.thapMin) &&
			  (thap < defaultValue.thapMax) &&
			  (cao > defaultValue.caoMin) &&
			  (cao < defaultValue.caoMax))
		{
			return 'bình thường'
		}

		if ((thap>defaultValue.thapMax) && (cao>defaultValue.caoMax)){
			return 'Lượng môi chất không đủ!';
		}

		if ((thap > defaultValue.thapMax) && (cao<defaultValue.caoMin)){
			return "Sụt áp trong máy nén!";
		}

		return '';
	}, [cao, thap]);

	return(
		<ScrollView className={'flex-1 bg-ink200 dark:bg-ink600 p-1'}>
			<FormInput
				key={'ap_thap'}
				keyboardType={"numeric"}
				placeholder={'áp suất thấp'}
				placeholderTextColor={'black'}
				inputStyle={{
					borderRadius: 8
				}}
				onChangeText={upThap}
			/>
			<View style={{
				height: 4,
			}} />

			<FormInput
				key={'ap_cao'}
				keyboardType={"numeric"}
				placeholder={'áp suất cao'}
				placeholderTextColor={'red'}
				inputStyle={{
					borderRadius: 8
				}}
				onChangeText={upCao}
			/>
			<Text className={'ts-16s text-violet-700'}>
				{error}
			</Text>
			<DefaultAc />
			<ErrorAc />
		</ScrollView>
	)
}

const DefaultAc = ()=>{
	return(
		<View>
			<Text className={'ts-18s text-ink900 dark:text-ink100 underline text-right'}>1. Hệ thống làm việc bình thường</Text>
			<View className={'px-1'}>
				<Text className={'ts-14b text-violet-700'}>Nếu hệ thống làm việc bình thờng, thì giá trị áp suất đồng hồ đọc
					chỉ ra như sau:</Text>
				<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
					* Phía áp suất thấp : Từ 0,15 đến 0,25 MPa (1,5 đến 2,5 kgf/cm2)
				</Text>

				<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
					* Phía áp suất cao : 1,37 đến 1,57 MPa (14 đến 16 kgf/cm2)
				</Text>
			</View>
		</View>
	)
}

const ErrorAc = ()=>{
	return(
		<View>
			<Text className={'ts-18s text-ink900 dark:text-ink100 underline text-right'}>Trạng thái lỗi</Text>
			<View className={'rounded-xl py-1'}>
				<AcTitle title={'2. Lượng môi chất không đủ.'} />
				<View className={'px-1 gap-y-1'}>
					<View>
						<Text className={'ts-14b text-violet-700 underline'}>Triệu chứng:</Text>
						<View className={'px-1'}>
							<Text className={'ts-14s text-orange500'}>
								-Áp suất cao ở cả phía cao áp và thấp áp.
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Nhìn thấy bọt khí qua kính quan sát.
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Mức độ làm lạnh không đủ.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-15b text-primaryB500 underline'}>
							Nguyên nhân:
						</Text>
						<View>
							<Text className={'ts-14s text-primaryB500 dark:text-ink200'}>
								.Lượng môi chất thấp.
							</Text>
							<Text className={'ts-14s text-primaryB500 dark:text-ink200'}>
								.Rò rỉ khí.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-14b text-green900 underline'}>
							Biện pháp khắc phục:
						</Text>
						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Kiểm tra rò rỉ.
						</Text>

						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Bổ sung môi chất.
						</Text>
					</View>
				</View>
			</View>

			<View className={'rounded-xl py-1'}>
				<AcTitle title={'3. Thừa môi chất hoặc việc làm mát giàn nóng không đủ.'} />
				<View className={'px-1 gap-y-1'}>
					<View>
						<Text className={'ts-14b text-violet-700 underline'}>Triệu chứng:</Text>
						<View className={'px-1'}>
							<Text className={'ts-14s text-orange500'}>
								-Áp suất cao ở cả phía cao áp và thấp áp.
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Không nhìn thấy bọt khí ở lỗ quan sát ngay cả khi làm việc ở tốc độ thấp.
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Mức độ làm lạnh không đủ.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-15b text-primaryB500 underline'}>
							Nguyên nhân:
						</Text>
						<View>
							<Text className={'ts-14s text-primaryB500 dark:text-ink200'}>
								.Thừa môi chất.
							</Text>
							<Text className={'ts-14s text-primaryB500 dark:text-ink200'}>
								.Tản nhiệt giàn nóng kém.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-14b text-green900 underline'}>
							Biện pháp khắc phục:
						</Text>
						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Điều chỉnh cho đúng lượng môi chất.
						</Text>

						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Làm sạch giàn nóng.
						</Text>

						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Kiểm tra hệ thống làm mát của xe (quạt điện,…)
						</Text>
					</View>
				</View>
			</View>

			<View className={'rounded-xl py-1'}>
				<AcTitle title={'4. Sụt áp trong máy nén.'} />
				<View className={'px-1 gap-y-1'}>
					<View>
						<Text className={'ts-14b text-violet-700 underline'}>Triệu chứng:</Text>
						<View className={'px-1'}>
							<Text className={'ts-14s text-orange500'}>
								-Phía áp suất thấp: cao, phía áp suất cao: thấp.
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Khi tắt máy điều hòa, ngay lập tức áp suất ở phía thấp áp và cao áp bằng nhau.
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Khi làm việc thân máy nén không đủ nóng.
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Mức độ làm lạnh không đủ
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-15b text-primaryB500 underline'}>
							Nguyên nhân:
						</Text>
						<View>
							<Text className={'ts-14s text-primaryB500 dark:text-ink200'}>
								.Sụt áp ở phía máy nén.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-14b text-green900 underline'}>
							Biện pháp khắc phục:
						</Text>

						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Kiểm tra sửa chữa máy nén.
						</Text>
					</View>
				</View>
			</View>

			<View className={'rounded-xl py-1'}>
				<AcTitle title={'5. Tắc nghẽn trong chu trình làm lạnh.'} />
				<View className={'px-1 gap-y-1'}>
					<View>
						<Text className={'ts-14b text-violet-700 underline'}>Triệu chứng:</Text>
						<View className={'px-1'}>
							<Text className={'ts-14s text-orange500'}>
								-Khi tắc nghẽn hoàn toàn, giá trị áp suất ở phía thấp áp giảm xuống giá trị chân không ngay lập tức.
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Khi có xu hướng tắc nghẽn, giá trị áp suất ở phía áp thấp giảm dần xuống giá trị chân không.
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Có sự chênh lệch nhiệt độ trước và sau chỗ tắc.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-15b text-primaryB500 underline'}>
							Nguyên nhân:
						</Text>
						<View>
							<Text className={'ts-14s text-primaryB500 dark:text-ink200'}>
								.Bụi bẩn hoặc hơi ẩm gây tắc nghẽn, đóng băng tại van tiết lưu, van EPR hoặc các lỗ khác.
							</Text>
							<Text className={'ts-14s text-primaryB500 dark:text-ink200'}>
								.Rò rỉ ga ở thanh cảm nhận nhiệt
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-14b text-green900 underline'}>
							Biện pháp khắc phục:
						</Text>
						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Phân loại nguyên nhân gây tắc. Thay thế các bộ phận, chi tiết gây ra tắc nghẽn.
						</Text>

						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Hút chân không hệ thống và nạp lại môi chất mới.
						</Text>
					</View>
				</View>
			</View>

			<View className={'rounded-xl py-1'}>
				<AcTitle title={'6. Khí lọt vào hệ thống .'} />
				<View className={'px-1 gap-y-1'}>
					<View>
						<Text className={'ts-14b text-violet-700 underline'}>Triệu chứng:</Text>
						<View className={'px-1'}>
							<Text className={'ts-14s text-orange500'}>
								-Giá trị áp suất ở cả hai phía cao áp và thấp áp đều cao.
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Khả năng làm lạnh giảm với sự tăng lên của áp suất thấp.
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Thấy bọt khí qua mắt ga dù môi chất đã nạp đủ.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-15b text-primaryB500 underline'}>
							Nguyên nhân:
						</Text>
						<View>
							<Text className={'ts-14s text-primaryB500 dark:text-ink200'}>
								.Hút chân không không triệt để.
							</Text>
							<Text className={'ts-14s text-primaryB500 dark:text-ink200'}>
								.Rò rỉ, lọt khí trên các đường ống dẫn.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-14b text-green900 underline'}>
							Biện pháp khắc phục:
						</Text>
						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Kiểm tra các đường ống dẫn.
						</Text>

						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Hút chân không triệt để, Thay thế môi chất mới.
						</Text>
					</View>
				</View>
			</View>

			<View className={'rounded-xl py-1'}>
				<AcTitle title={'7. Van tiết lưu mở quá lớn.'} />
				<View className={'px-1 gap-y-1'}>
					<View>
						<Text className={'ts-14b text-violet-700 underline'}>Triệu chứng:</Text>
						<View className={'px-1'}>
							<Text className={'ts-14s text-orange500'}>
								-Áp suất phần thấp áp tăng, tính năng làm lạnh giảm (áp suất ở phía cao áp hầu như không đổi).
							</Text>
							<Text className={'ts-14s text-orange500'}>
								-Bám tuyết trên đường ống áp suất thấp.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-15b text-primaryB500 underline'}>
							Nguyên nhân:
						</Text>
						<View>
							<Text className={'ts-14s text-primaryB500 dark:text-ink200'}>
								.Hỏng van tiết lưu hoặc điều chỉnh không đúng.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-14b text-green900 underline'}>
							Biện pháp khắc phục:
						</Text>
						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Kiểm tra và sửa chữa tình trạng lắp đặt của ống cảm nhận nhiệt.
						</Text>

						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Kiểm tra lại van tiết lưu.
						</Text>
					</View>
				</View>
			</View>

			<View className={'rounded-xl py-1'}>
				<AcTitle title={'8. Hơi ẩm trong hệ thống làm lạnh.'} />
				<View className={'px-1 gap-y-1'}>
					<View>
						<Text className={'ts-14b text-violet-700 underline'}>Triệu chứng:</Text>
						<View className={'px-1'}>
							<Text className={'ts-14s text-orange500'}>
								-Hệ thống làm viêc bình thường khi điều hòa bắt đầu hoạt động. Sau một thời gian phía áp suất thấp của đồng hồ chỉ độ chân không tăng dần.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-15b text-primaryB500 underline'}>
							Nguyên nhân:
						</Text>
						<View>
							<Text className={'ts-14s text-primaryB500 dark:text-ink200'}>
								.Hơi ẩm lọt vào hệt thống làm lạnh.
							</Text>
						</View>
					</View>

					<View>
						<Text className={'ts-14b text-green900 underline'}>
							Biện pháp khắc phục:
						</Text>
						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Thay thế bình chứa.
						</Text>

						<Text className={'ts-16s text-primaryA500 dark:text-ink200'}>
							* Hút chân không toàn bộ hệ thống trước khi nạp môi chất. Việc này giúp loại bỏ hơi nước ra khỏi hệ thống.
						</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

type AcTitleType = {
	title: string,
};

const AcTitle: FunctionComponent<AcTitleType> = ({title})=>{
	return(
		<Text className={'ts-16s text-primaryA500 dark:text-ink200 underline py-1'}>
			{title}:
		</Text>
	)
}

export default AcScreen;
